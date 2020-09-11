sap.ui.define([
	"sap/ui/base/Object"
], function (BaseObject) {

	return BaseObject.extend("com.sap.training.ux402.masterdetail.UX402_MasterDetailExercise.controller.ListSelector", {

		constructor: function () {

			this._oWhenListHasBeenSet = new Promise(fnResolveListHasBeenSet => {
				this._fnResolveListHasBeenSet = fnResolveListHasBeenSet;
			});

			this.oWhenListLoadingIsDone = new Promise((fnResolve, fnReject) => {
				this._oWhenListHasBeenSet.then(oList => {
					oList.attachEventOnce("updateFinished", oData => {

						if (!oData) {
							fnReject({
								list: oList,
								error: true
							});
						}

						let oFirstListItem = oList.getItems()[0];
						if (oFirstListItem) {
							fnResolve({
								list: oList,
								firstListItem: oFirstListItem
							});
						} else {
							fnReject({
								list: oList,
								error: true
							});
						}

					});
				});
			});

		},

		setBoundMasterList: function (oList) {

			this._oList = oList;
			this._fnResolveListHasBeenSet(oList);

		},

		clearMasterSelection: function () {
			this._oWhenListHasBeenSet.then(() => {
				this._oList.removeSelection(true);
			});
		},

		selectAListItem: function (sBindingPath) {

			this.oWhenListLoadingIsDone.then(() => {

				let oList = this._oList;
				if (oList.getMode() === "None") {
					return;
				}

				let oSelectedItem = oList.getSelectedItem();
				if (oSelectedItem && oSelectedItem.getBindingContext().getPath() === sBindingPath) {
					return;
				}

				oList.getItems().some(oItem => {
					if (oItem.getBindingContext() && oItem.getBindingContext().getPath() === sBindingPath) {
						oList.setSelectedItem(oItem);
						return;
					}
				});

			});
		}

	});

});