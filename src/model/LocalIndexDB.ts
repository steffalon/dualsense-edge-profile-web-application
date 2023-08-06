import Storage from "./Storage";
import Profile from "./Profile";

export default class LocalIndexDB implements Storage<IDBValidKey, Profile> {


    // IndexDB API https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
    private db!: IDBDatabase;
    private readonly dbName!: string;

    constructor(dbName: string) {
        this.dbName = dbName;
    }

    async init() {
        const request: IDBOpenDBRequest = indexedDB.open(this.dbName);
        return new Promise<void>((resolve, reject) => {
            request.onupgradeneeded = (dbVersionEvent: any) => {
                this.db = request.result;
                const objectStore = this.db.createObjectStore("profiles", {keyPath: "id"});
                objectStore.createIndex("profile", "label", {unique: false});

                dbVersionEvent.target.onsuccess = () => {
                    return resolve();
                }
            }
            request.onsuccess = () => {
                this.db = request.result;
                return resolve();
            }
            request.onerror = () => {
                return reject();
            }
        })
    }


    async getAll(): Promise<Profile[]> {
        if (!this.db) await this.init();
        const transaction = this.db.transaction('profiles', "readonly")
            .objectStore('profiles')
            .getAll();

        return new Promise<Profile[]>((resolve, reject) => {
            transaction.onsuccess = () => {
                resolve(transaction.result);
            }
            transaction.onerror = () => {
                reject("Failed to obtain profiles");
            }
        });
    }

    async get(key: IDBValidKey): Promise<Profile> {
        if (!this.db) await this.init();
        const transaction = this.db.transaction('profiles', "readonly")
            .objectStore('profiles')
            .get(key);
        return new Promise<Profile>((resolve, reject) => {
            transaction.onsuccess = () => {
                resolve(transaction.result);
            }
            transaction.onerror = () => {
                reject("Failed to obtain profiles");
            }
        });
    }

    store(profile: Profile): boolean {
        this.db
            .transaction("profiles", "readwrite")
            .objectStore("profiles")
            .add(profile);
        return true;
    }

    update(profile: Profile): boolean {
        let objectStore = this.db
            .transaction("profiles", "readwrite")
            .objectStore("profiles")

        const profileRequest = objectStore.get(profile.getId());

        profileRequest.onsuccess = () => {
            const data = profileRequest.result;
            data.label = profile.getLabel();
            data.leftJoystick = JSON.parse(JSON.stringify(profile.getLeftJoyStick()));
            data.rightJoystick = JSON.parse(JSON.stringify(profile.getRightJoyStick()));
            data.leftTrigger = Object.assign({}, profile.getLeftTrigger());
            data.rightTrigger = Object.assign({}, profile.getRightTrigger());
            data.buttonMapping.buttons = Object.assign([], profile.getButtonMapping().getButtons());
            objectStore.put(data);
        }

        return true;
    }

    delete(key: IDBValidKey): boolean {
        this.db
            .transaction("profiles", "readwrite")
            .objectStore("profiles")
            .delete(key);
        return true;
    }

}