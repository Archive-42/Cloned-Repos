(function () {
	var guideJS;
	
	var recommend_table = 'sys_user'; // could assign HR Profile or other criteria in options, need to manage access.
	var recGR = new GlideRecord(recommend_table);
	recGR.addQuery( (recommend_table == 'sys_user') ? 'sys_id' : 'user', gs.getUserID() );
	if (options.recommend_query) recGR.addEncodedQuery(options.recommend_query);
	recGR.query();
	data.isRecommended = recGR.hasNext();
	if (!data.isRecommended) return;
	
	data.sys_id = $sp.getParameter('sys_id');
	data.collapseItemList = data.allowCollapse = options.collapse_items_list == 'true';
	data.featuredOnPage = options.featured_on_page == 'true';
	
	['auto_redirect', 'requested_for_id', 'requested_for_display'].forEach(function (embeddedWidgetOption) {
		if (input && typeof input[embeddedWidgetOption] != 'undefined')
			options[embeddedWidgetOption] = input[embeddedWidgetOption];
	});
	
	if(input && input.action == 'order_guide') {
		data.orderGuideModal = $sp.getWidget('widget-modal', {
																											embeddedWidgetId: 'sc-checkout', 
																											embeddedWidgetOptions: {
																																	cart: {name: input.cart}, 
																																	action: input.action, 
																																	item: input.items, 
																																	requested_for: {id:options.requested_for_id, displayValue:options.requested_for_display}, 
																																	auto_redirect: options.auto_redirect,
																																	parentParams: input.workspaceParams
																																}, 
																											backdrop: 'static', 
																											keyboard: false, 
																											size: 'md'
																								});
		return;
	}
	else if (input && input.action === 'log_request') {
		 $sp.logStat('Cat Item Request', input.itemDetails.sys_class_name, input.itemDetails.sys_id, input.itemDetails.name);
		 return;
	}
	else if(input && input.action == "init_guide") {
		guideJS = new sn_sc.OrderGuide('' + input.orderGuideData.sysparm_id);
		var temp = guideJS.init(input.orderGuideData);
		data.showIncludeToggle = guideJS.isIncludeItems();
		data.items = [];
		var item;
		for(var i = 0; i < temp.items.length; i++) {
			var catItem = new sn_sc.CatItem('' + temp.items[i].sys_id);
			if(!catItem.canView() || !catItem.isVisibleServicePortal())
				continue;
			var itemData = {
				'sys_id': temp.items[i].sys_id, 
				'table': 'sc_cat_item', 
				'quantity': temp.items[i].quantity, 
				'is_guide': true, 
				'is_ordering': true,
				'variables' : {}
			};
			if (input.orderGuideData.cascade) {
				for (var gf in input.orderGuideData._fields) {
					var field = input.orderGuideData._fields[gf];
					itemData.variables[field.name] = field.value;	
				}
			}
			item = $sp.getCatalogItem(itemData);
			item.quantity = temp.items[i].quantity;
			item.show_quantity = temp.items[i].show_quantity;
			item.isOrderGuideItem = true;
			item.included = true;
			item.sysparm_item_guid = gs.generateGUID();
			
			var table_name = 'sc_cart_item';
			var className = item.sys_class_name;
			if (!new global.CatalogItemTypeProcessor().canCreateNormalCartItem(className)) {
				if (className == 'sc_cat_item_producer') {
					var gr = new GlideRecord('sc_cat_item_producer');
					if (gr.get(item.sys_id))
						table_name = gr.getValue('table_name');
				}
			}
			item.targetTable = table_name;
			if (input.orderGuideData.cascade) {
				for (var field in item._fields) {
					var f = item._fields[field];
					for (var gf in input.orderGuideData._fields) {
						if (input.orderGuideData._fields[gf].name === f.name) {
							f.value = input.orderGuideData._fields[gf].value;
							f.displayValue = input.orderGuideData._fields[gf].displayValue;
							f.display_value_list = input.orderGuideData._fields[gf].display_value_list;
							break;
						}
					}
				}
			}
			if (temp.variable_assignments[item.sys_id]) {
				var cur = temp.variable_assignments[item.sys_id];
				for (var fieldId in cur) {
					var q = GlideappQuestion.getQuestion(fieldId);
					item._fields[q.getName()].value = cur[fieldId];
					
					if (q.getType() == 21 || q.getType() == 8) {
						q.setValue(cur[fieldId]);
						if (q.getType() == 21) {
							var vals = '' + q.getDisplayValues();
							vals = vals.slice(1, -1);
							item._fields[q.getName()].display_value_list = vals.split(', ');
						}
					}
					item._fields[q.getName()].displayValue = q.getDisplayValue();
				}
			}
			data.items.push(item);
		}
		return;
	}
	else if(input && input.action == "checkout_guide") {
		guideJS = new sn_sc.OrderGuide('' + data.sys_id);
		var cartJS = new sn_sc.CartJS('' + data.sys_id);
		for(var i = 0; i < input.guideItems.length; i++)
			guideJS.navigateFromMap(input.guideItems[i]);
		cartJS.activateGuide();
		cartJS.setParentParams(input.workspaceParams);
		data.result = cartJS.checkoutGuide();
		return;
	}
	else if(input && input.action == "add_to_cart") {
		var cart = new sn_sc.CartJS();
		guideJS = new sn_sc.OrderGuide('' + input.sys_id);
		for(var i = 0; i < input.items.length; i++) {
			input.items[i].sysparm_cart_name = "";
			guideJS.navigateFromMap(input.items[i]);
		}
		if (guideJS.isUseCustomCart())
			new sn_sc.CartJS(input.sys_id).empty("");
		cart.activateGuide();
		return;
	}
	else if(input && input.action == "format_prices") {
		data.frequencySequence = [];
		var gr = new GlideRecord('sys_choice');
		gr.addQuery('name', 'sys_frequency');
		gr.orderBy('sequence');
		gr.query();
		while(gr.next())
			data.frequencySequence.push(gr.label.getDisplayValue());
		var spCurrencyFormatter = new SPCurrencyFormatter();
		data.frequencyMap = {};
		for(var key in input.prices)
			data.frequencyMap[key] = spCurrencyFormatter.format(input.prices[key]);
		return;
	}
	
	// portal can specify a catalog and category home page
	data.sc_catalog_page = $sp.getDisplayValue("sc_catalog_page") || "sc_home";
	data.sc_category_page = $sp.getDisplayValue("sc_category_page") || "sc_category";
	data.sc_catalog = $sp.getDisplayValue('sc_catalog') ;
	var catalogID = $sp.getValue('sc_catalog');

	var m = data.msgs = {};
	m.scHomeMsg = gs.getMessage("Service Catalog");
	m.step1 = gs.getMessage("Describe Needs");
	m.step2 = gs.getMessage("Choose Options");
	m.step3 = gs.getMessage("Summary");
	m.prevMsg = gs.getMessage("Previous");
	m.nextMsg = gs.getMessage("Next");
	m.submitMsg = gs.getMessage("Submit");
	m.orderNowMsg = gs.getMessage("Order Now");
	m.submittedMsg = gs.getMessage("Submitted");
	m.createdMsg = gs.getMessage("Created");
	m.clickMsg = gs.getMessage("click here to view");
	m.dialogTitle = gs.getMessage("Delete Attachment");
	m.dialogMessage = gs.getMessage("Are you sure?");
	m.dialogOK = gs.getMessage("OK");
	m.dialogCancel = gs.getMessage("Cancel");
	data.maxAttachmentSize = parseInt(gs.getProperty("com.glide.attachment.max_size", 1024));
	if (isNaN(data.maxAttachmentSize))
		data.maxAttachmentSize = 24;
	m.largeAttachmentMsg = gs.getMessage("Attached files must be smaller than {0} - please try again", "" + data.maxAttachmentSize + "MB");
	m.renameSuccessMsg = gs.getMessage("Attachment renamed successfully");
	m.deleteSuccessMsg = gs.getMessage("Attachment deleted successfully");
	m.invalidRecordMsg = gs.getMessage('You are either not authorized or record is not valid.');
	m.delete_attachment = gs.getMessage("Delete Attachment?");
	
	m.recommendedForMsg = gs.getMessage("Recommended for {0}", [gs.getUser().getRecord().getValue('first_name')]);
	m.featuredMsg = gs.getMessage("Featured");
	m.includedMsg = gs.getMessage("What's included?");
	m.inTheBoxMsg = gs.getMessage("What else is included?");
	
	data.hideDeliveryTime = (options.hide_delivery_time == 'true');
	if (options.sys_id)
		data.sys_id = options.sys_id;

	if (!data.sys_id)
		return;

	var validatedItem = new sn_sc.CatItem('' + data.sys_id);
  if (!validatedItem.canView())
    return;

	data.sys_properties = {
		twostep: gs.getProperty("glide.sc.sp.twostep", "true") == 'true'
	};

	data.showPrices = $sp.showCatalogPrices();
  data.sc_cat_item = $sp.getGuide(data.sys_id, true, false);
	data.recordFound = true;
	if (data.sc_cat_item.category) {
		var categoryJS;
		var categoryID = validatedItem.getFirstAccessibleCategoryForSearch(catalogID);
		if ($sp.getParameter("sysparm_category")) {
			categoryJS = new sn_sc.CatCategory($sp.getParameter("sysparm_category") + "");
			categoryID = $sp.getParameter("sysparm_category") + "";
		}
		else
			categoryJS = new sn_sc.CatCategory(categoryID);
		data.category = {
			name: categoryJS.getTitle(),
			url: categoryJS.canView() ? '?id=' + data.sc_category_page + '&sys_id=' + categoryID : "#"
		}
		data.categories = [];
		data.categories.push({
			label: categoryJS.getTitle(),
			url: categoryJS.canView() ? '?id=' + data.sc_category_page + '&sys_id=' + categoryID : "#"
		});
		while(categoryJS && categoryJS.getParent()) {
			var parentId =  categoryJS.getParent();
			categoryJS = new sn_sc.CatCategory(parentId);
			var category = {
				label: categoryJS.getTitle(),
				url: categoryJS.canView() ? '?id=' + data.sc_category_page + '&sys_id=' + parentId : "#"
			};
			data.categories.unshift(category);
		}
	}

	$sp.logStat('Cat Item View', data.sc_cat_item.sys_class_name, data.sc_cat_item.sys_id, data.sc_cat_item.name);
})()