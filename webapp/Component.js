sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/sap/training/ux402/masterdetail/UX402_MasterDetailExercise/model/models",
	"com/sap/training/ux402/masterdetail/UX402_MasterDetailExercise/controller/ListSelector"
], function (UIComponent, Device, models, ListSelector) {
	"use strict";

	return UIComponent.extend("com.sap.training.ux402.masterdetail.UX402_MasterDetailExercise.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			this.oListSelector = new ListSelector();

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});