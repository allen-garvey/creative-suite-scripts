/*
* Used for core functions used by multiple includes
*/
JSX = JSX || {};

/*
* Used to test if an item is editable i.e. locked or not
* items are objects such as pathItem or rasterItem
*/
JSX.isItemLocked = function(item){
	return item.locked || item.layer.locked;
}

/*
* Used to test if an item is editable i.e. hidden or not
* items are objects such as pathItem or rasterItem
*/
JSX.isItemHidden = function(item){
	return item.hidden || !item.layer.visible;
}