(ns ^{:author "Jitendra Takalkar jitendra.takalkar@gmail.com"
      :doc "Common views"}
  ordreui.views.common
  (:use [noir.core :only [defpartial]]
        [hiccup.page-helpers :only [include-css include-js html5]]))

(defpartial layout [& content]
  (html5
   [:head
    [:title "Ordre UI"]
    (include-css "/css/reset.css")]
   [:body
    [:div#wrapper
     content]]))

(defpartial ordreui-layout [& content]
  (html5
   [:head
    [:meta {:charset "utf-8"}]
    [:title "Order UI for Kasia 2.0"]
    [:meta {:content "Order UI for kasia 2.0" :name "description"}]
    [:meta {:content "no" :http-equiv "imagetoolbar"}]
    [:meta {:content "jitendra.takalkar@gmail.com" :name "author"}]
    [:meta {:content "initial-scale=1.0, user-scalable=no" :name "viewport"}]
    (include-js "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" 
                "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js" 
                "/js/grid.locale-en.js" 
                "/js/ui.multiselect.js" 
                "/js/jquery.jqGrid.min.js" 
                "/js/jquery.tablednd.js" 
                "/js/jquery.contextmenu.js"
                "/js/jquery.treeview.js"
                "/js/ejs.js"
                "/js/order-ui.js"
       )
    (include-css "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/ui-lightness/jquery-ui.css"
                 "/css/ui.jqgrid.css"
                 "/css/site.css"
                 "/css/style.css"
                 "/css/tocLayout.css"
                 "/css/order-ui.css"
                 "/css/ui.multiselect.css")]
   [:body {:id "interior"}
    content]))
