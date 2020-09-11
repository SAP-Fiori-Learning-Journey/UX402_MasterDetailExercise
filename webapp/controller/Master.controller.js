sap.ui.define([
	"com/sap/training/ux402/masterdetail/UX402_MasterDetailExercise/controller/BaseController",
	"sap/ui/Device"
], function (BaseController, Device) {
	"use strict";

	return BaseController.extend("com.sap.training.ux402.masterdetail.UX402_MasterDetailExercise.controller.Master", {
		
		onInit: function() {

			var oList = this._oList = this.byId("list");
			this.getListSelector().setBoundMasterList(oList);

			this.getRouter().getRoute("master").attachPatternMatched(this._onMasterMatched, this);
			this.getRouter().attachBypassed(this.onBypassed, this);
			
		},
		
		onSelect: function(oEvent) {
			this._showDetails(oEvent.getParameter("listItem") || oEvent.getSource());
		},
		
		onBypassed: function() {
			this._oList.removeSelections(true);
		},
		
		onUpdateFinished: function(oEvent) {
			var oList = this._oList = oEvent.getSource() || this.byId("list");
			this.getListSelector().setBoundMasterList(oList);
		},
		
		_onMasterMatched: function() {
			this.getListSelector().oWhenListLoadingIsDone.then(function(mParams) {
				
				if(mParams.list.getMode() === "None") {
					return;
				}
				
				let sObjectId = mParams.firstListItem.getBindingContext().getProperty("carrid");
				this._navigateToCarrierDetails(sObjectId, true);
				
			}.bind(this));
		},
	
		_navigateToCarrierDetails: function(sCarrierId, bReplace) {
			
			this.getRouter().navTo("carrierDetails", {
				carrierId: sCarrierId
			}, bReplace);
			
		},
		
		_showDetails: function(oItem) {

			var bReplace = !Device.system.phone;
			var sCarrierId = oItem.getBindingContext().getProperty("carrid");
			this._navigateToCarrierDetails(sCarrierId, bReplace);
			
		}
		
	});
	
});