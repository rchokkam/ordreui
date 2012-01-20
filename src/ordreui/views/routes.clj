(ns ^{:author "Jitendra Takalkar jitendra.takalkar@gmail.com"
      :doc "Ordre ui routes"}
  ordreui.views.routes
  (:use [noir.core :only [defpage]]
        [clojure.data.json :only [json-str]])
  (:require [ordreui.views.common :as common]
            [noir.response :as response]
            [http.async.client :as c]))

(defpage "/ping" [] 
  {:status 200
   :body "pong"})

(defpage "/uuid/:uuid" {uuid :uuid}
  (with-open [client (c/create-client)]
    (let [response (c/GET client
                          (str "http://darton:41001/ordre-v1/" uuid)
                          :headers {:accept "application/vnd.yousee.kasia2+json;charset=UTF-8;version=1"})]
      (c/await response)
      {:status 200
       :headers {"Content-Type" "application/json"}
       :body (c/string response)})))

(defpage "/kunde/:kid" {kid :kid}
  (with-open [client (c/create-client)]
    (let [response (c/GET client
                          (str "http://darton:41001/ordre-v1/" kid)
                          :headers {:accept "application/vnd.yousee.kasia2+json;charset=UTF-8;version=1"})]
      (c/await response)
      {:status 200
       :headers {"Content-Type" "application/json"}
       :body (c/string response)})))