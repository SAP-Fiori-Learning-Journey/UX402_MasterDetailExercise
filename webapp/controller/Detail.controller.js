sap.ui.define([
	"com/sap/training/ux402/masterdetail/UX402_MasterDetailExercise/controller/BaseController",
	"sap/ui/Device"
], function (BaseController, Device) {
	"use strict";

	return BaseController.extend("com.sap.training.ux402.masterdetail.UX402_MasterDetailExercise.controller.Detail", {
		
		onInit: function() {
			this.getRouter().getRoute("carrierDetails").attachPatternMatched(this._onObjectMatched, this);
		},
		
		_onBindingChange: function () {
			
			var oElementBinding = this.getView().getElementBinding();
			if(!oElementBinding.getBoundContext()) {
					this.getRouter().getTargets().display("detailObjectNotFound");
					this.getListSelector().clearMasterListSelection();
					return;
			}
			
			var sPath = oElementBinding.getPath();
			this.getListSelector().selectAListItem(sPath);
			
		},
		
		_bindView: function(sObjectPath) {
			var oView = this.getView();
			oView.bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function() {
						oView.setBusy(true);
					},
					dataReceived: function() {
						oView.setBusy(false);
					}
				}
			});
			
		},
		
		_onObjectMatched: function(oEvent) {
			
			var sObjectId = oEvent.getParameter("arguments").carrierId;
			var sObjectPath = `/CarrierCollection('${sObjectId}')`;
			this._bindView(sObjectPath);
			
		}

	});

});