export default interface Storage<K, V> {
    getAll(): Promise<V[]>;

    get(key: K): Promise<V>;

    store(data: V): boolean;

    update(data: V): boolean;

    delete(key: K): boolean;
}