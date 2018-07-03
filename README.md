# Video-monitoring-and-automatic-classification-app

This application is meant to be used to monitor and direct people who enter a building based on	specific visual characteristics.

---

The process of classification is using the **Tensorflow**  framework to infer the class in which a captured frame belongs to and is using a MobileNet type of CNN *(Convolutional Neural Network)* called **MobileNet_V1** that can be retrained using transfer learning to the desired outcome.

---

This system has two parts:
* A central application that is used to monitor and configure the remote application instances
* A remote application that can be deployed in the desired places


#### Build Setup For Central App

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```
---
#### Build Setup For Remote App
``` bash
# install dependencies
npm install

# start electron process
npm start 127.0.0.1:3000 (or if it is running on a different machine than the Central App, use that specific IPv4 adress)

```
