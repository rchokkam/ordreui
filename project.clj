(defproject ordreui "0.1.0-SNAPSHOT"
  :description "Ordre User Interface"
  :dependencies [[org.clojure/clojure "1.3.0"]
                 [noir "1.2.1"]]
  :dev-dependencies [[swank-clojure "1.3.3"]
  					 [lein-ring "0.5.2"]]
  :ring {:handler ordreui.server/handler}
  :main ordreui.server)