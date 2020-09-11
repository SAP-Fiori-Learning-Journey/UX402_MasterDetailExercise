sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";
	
	return Controller.extend("com.sap.training.ux402.masterdetail.UX402_MasterDetailExercise.controller.BaseController", {
		
		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},
		
		getListSelector: function() {
			return this.getOwnerComponent().oListSelector;
		},
		
		getResourceBundle: function() {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},
		
		onNavBack: function() {
			
			var sPreviousHash = History.getInsance().getPreviousHash();
			
			if(sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("master", {}, true);
			}
			
		}
		
	});
	
});