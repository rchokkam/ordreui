(ns ^{:author "Jitendra Takalkar jitendra.takalkar@gmail.com"
      :doc "Welcome page views"}
  ordreui.views.welcome
  (:require [ordreui.views.common :as common])
  (:require [noir.response :as response])
  (:use [noir.core :only [defpage]]
        [hiccup.core :only [html]]))

(defpage "/" []
  (response/redirect "/ordreui"))

(defpage "/welcome" []
  (common/layout
   [:p "Welcome to ordreui"]))

(defpage "/ordreui" []
  (common/ordreui-layout
   [:div#siteContain
    [:div#header
     [:a#siteLogo {:href "http://yousee.dk", :title "YouSee a/s"}
      [:img {:src "images/yousee_logo_v2.png", :alt "YouSee - vi skaber glæde foran skærmen"}]]
     [:h1 "Ordre UI for Kasia 2.0"]]    
    [:div#content {:class "clearfix"}
     [:div#primaryContent 
      [:div
       [:div#sr-accordion
        [:h3 [:a {:href "#"} "Search Ordre"]]
        [:div#sr-ordre
         [:div#sr-ordre-uuid 
          [:div#toolbar-uuid {:class "ui-widget-header ui-corner-all"}
           [:label {:for "uuid"} "UUID: "]
           [:input#uuid {:type "text", :value "40076b24-49ae-4b1d-98dc-ada57b717a17"}]
           [:button#uuid-b "Go"]]]
         [:div#sr-ordre-kid
          [:div#toolbar-kid {:class "ui-widget-header ui-corner-all"}
           [:label {:for "kid"} "KUNDE ID: "]
           [:input#kid {:type "text" :value "600575901"}]
           [:button#kid-b "Go"]]]]]
       
       [:div {:id "ou-tabs"}
        [:ul
         [:li [:a {:id "ou-a-tab-1", :href "#ou-tabs-1"}"Ordre"]]
         [:li [:a {:id "ou-a-tab-2", :href "#ou-tabs-2"}"Kunde"]]
         [:li [:a {:id "ou-a-tab-3", :href "#ou-tabs-3"}"Address"]]
         [:li [:a {:id "ou-a-tab-4", :href "#ou-tabs-4"}"Steps"]]
         [:li [:a {:id "ou-a-tab-5", :href "#ou-tabs-5"}"Response"]]
         [:li [:a {:id "ou-a-tab-6", :href "#ou-tabs-6"}"Tree View"]]]
        [:div {:id "ou-tabs-1"}
         [:div {:id "ou-ordre"}]]
        [:div {:id "ou-tabs-2"}
         [:div {:id "ou-kunde"}]]
        [:div {:id "ou-tabs-3"}
         [:div {:id "ou-address"}]]
        [:div {:id "ou-tabs-4"}
         [:div {:id "ou-steps"}]]
        [:div {:id "ou-tabs-5"}
         [:div {:id "ou-response"}]]
        [:div {:id "ou-tabs-6"}
         [:div {:id "ou-jstreeview"}]]]]]]]))

