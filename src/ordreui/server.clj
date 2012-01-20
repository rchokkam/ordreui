(ns ordreui.server
  (:require [noir.server :as server]
            [ordreui.views.common]
            [ordreui.views.welcome]
            [ordreui.views.routes]))

(server/load-views-ns 'orderui.views)

(def handler (server/gen-handler {:mode :dev
                                  :ns 'ordreui
                                  :base-url "/ordreui"}))

(defn -main [& m]
  (let [mode (keyword (or (first m) :dev))
        port (Integer. (get (System/getenv) "PORT" "8080"))]
    (server/start port {:mode mode
                        :ns 'ordreui})))

