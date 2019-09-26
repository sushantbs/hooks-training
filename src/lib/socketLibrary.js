// @ts-check
import snarky from "./snarky";

const eventMap = {};
const MESSAGE = "message";
const META = "meta";

const socketLibrary = {
  async connect(options) {
    const connection = {

      on(event, handler) {
        eventMap[event] = handler;
      },

      async post(type, content) {
        if (type === "message") {
          await new Promise(resolve => setTimeout(resolve, 200));
          eventMap[MESSAGE]({ sender: "me", content });

          await new Promise(resolve => setTimeout(resolve, 600));
          eventMap[META]({ type: "typing", source: "snarky" });

          await new Promise(resolve => setTimeout(resolve, 1000));
          eventMap[MESSAGE]({ sender: "Snarky", content: snarky.respondTo(content) });
        }

        return {
          success: true
        }
      }
    }

    await new Promise(resolve => setTimeout(resolve, 200));
    return connection;
  }
}

export default socketLibrary