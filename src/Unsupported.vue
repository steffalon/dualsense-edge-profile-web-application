<template>
  <section class="unsupported">
    <section class="unsupported-content">
      <h3 class="unsupported-header">Unsupported browser</h3>
      <p class="unsupported-paragraph">Please use a browser that supports the WebHID API. To determine which browsers
        are compatible, you can refer to the
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API#browser_compatibility">MDN web docs</a>.
      </p>
    </section>
  </section>
</template>
<style scoped>
.unsupported {
  margin: auto;
  display: flex;
  height: 100vh;
  padding: 0 25px;
  max-width: 520px;
}

.unsupported-content {
  margin: auto;
  color: #475d5b;
  border-bottom: 2px solid #00332c;
  border-top: 2px solid #00332c;
  padding: 10px 20px;
}

.unsupported-content a {
  color: #faae2b;
  font-weight: bold;
}

.unsupported-header {
  color: #00473e;
  letter-spacing: 0.42pt;
}

.unsupported-paragraph {
  letter-spacing: 0.16pt;
  line-height: 1.5rem;
}

@media (prefers-color-scheme: dark) {

  .unsupported-header {
    color: #fffffe;
  }

  .unsupported-content {
    color: #a7a9be;
    border-bottom: 2px solid #ffffff;
    border-top: 2px solid #ffffff;
    background-color: #1F1B24;
  }

  .unsupported-content a {
    color: #ff8906;
    font-weight: bold;
  }
}
</style>