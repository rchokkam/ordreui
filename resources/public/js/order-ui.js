/*order ui javascript file*/

/* Global variables*/
var accept_header = 'application/vnd.yousee.kasia2+json;charset=UTF-8;version=1',
	jq_grid_width_1 = 708,jq_grid_width_2 = 658,map,marker;

$(function(){

	$('#sr-accordion').accordion({autoHeight:false});
	$("#ou-tabs").tabs();

	/*$("#ou-a-tab-3").bind("click",function(){
		if(map!=undefined || map!=null){
			google.maps.event.trigger(map, 'resize');
		}

		if(marker!=undefined || marker!=null){
			map.setCenter(marker.getPosition());
			google.maps.event.trigger(marker, 'click');	
		}		
	});*/
	
	$("#ou-tabs").hide();
	
	$('button').button();	

	$('#uuid-b').click(function(){
		handle_button_click();
	}); 

	// handle enter key for request
	$("input#uuid").keypress(function(e) {
		if(e.which == 13) {			
    		$('uuid-b').focus();
    		handle_button_click();
    	}   	
	});

});
/**
 * Function to handle Go button.
 **/
var handle_button_click=function() {
	$("#ou-tabs").hide();
	// Get uuid
	var uuid = $("#uuid").attr('value');	
	$('body').css('cursor','wait');	
	try{
		// invoke the web service
		process_order_by_uuid(uuid);						
	}catch(err){
		console.log(err);
		display_error_msg(err);			
	}
	$('body').css('cursor','auto');

	$("#ou-a-tab-1").trigger('click');
};
/**
 * Replacer callback function for JSON.stringnify.
 */
var replacer_ou=function(key, value) {
	return value;
};
/**
 * Process order by uuid.
 **/
var process_order_by_uuid = function(uuid) {
	var ruri = '/ordre-v1/' + uuid;
 	$.ajax({
 		url: ruri,
		processData:false,
		type: 'GET',
		beforeSend:function(jqXHR, settings){			
			jqXHR.setRequestHeader("Accept", accept_header);
			jqXHR.setRequestHeader("Content-Type", accept_header);
			$("#ou-ordre").empty();
			$("#ou-kunde").empty();
			$("#ou-response").empty();	
			$('#ou-jstreeview').empty();
			$('body').css('cursor','wait');		
		},
		success: function(data, textStatus, jqXHR){						
			// Display tab widget.
			$("#ou-tabs").show();

			$("#ou-response").html('<pre id="ou-rspre">' + JSON.stringify(data, replacer_ou, 4) + '</pre>');			
			render_json_as_tree_ou(data);

			// Render order details
			$("#ou-ordre").html(
				get_html_by_template('js/ejs/ordre.js',data)
			);
			
			$('#order-detail-acrdion').accordion({
				autoHeight : false,
				navigation : true
			});
			
			$('#order-aftaler-acrdion').accordion({
				autoHeight : false,
				navigation : true
			});
						
			var kundeData=data['kunde-data'];

			// Render kunde information
			$("#ou-kunde").html(
				get_html_by_template('js/ejs/kunde.js',kundeData)
			);
			
			// Render Aftaler
			render_order_aftaler(kundeData.aftaler);
			// Render Valgt
			render_order_valgt(kundeData.valgt);
			// Render Opsagt				
			render_order_opsagt(kundeData.opsagt);


			// Render steps Tab		
			render_order_steps(data.steps);

			// Kunde Tab
			process_order_by_kunde_id(data.kundeid);

			// Address Tab
			//render_goog_map_by_amsid(data.amsid);		

		},
		error: function(jqXHR, textStatus, errorThrown){
			//alert('Error process_order_by_uuid');	
			display_error_msg(errorThrown);			
		},
		complete: function(jqXHR,textStatus){
			$('body').css('cursor','auto');			
		}						
	});
 };
/**
 * Return the kunde id
 **/
var process_order_by_kunde_id = function(kid) {
	var ruri = '/ordre-v1/' + kid;
 	$.ajax({
 		url: ruri,
		processData:false,
		type: 'GET',
		beforeSend:function(jqXHR, settings){			
			jqXHR.setRequestHeader("Accept", accept_header);
			jqXHR.setRequestHeader("Content-Type", accept_header);			
			$('body').css('cursor','wait');				
		},
		success: function(data, textStatus, jqXHR){						
			// Render kunde information
			render_kunde_orders(data);					
		},
		error: function(jqXHR, textStatus, errorThrown){
			//alert('Error process_order_by_kunde_id');	
			$('#kunde-orders').empty();
			display_error_msg(errorThrown);			
		},
		complete: function(jqXHR,textStatus){	
			$('body').css('cursor','auto');		
		}						
	});
 };

 /**
 * Render Google Map for Address by ams id.
 **/
 var render_goog_map_by_amsid = function(amsid) {
 	var ruri = '/adresse-v1/' + amsid;
 	$.ajax({
 		url: ruri,
		processData:false,
		type: 'GET',
		beforeSend:function(jqXHR, settings){			
			jqXHR.setRequestHeader("Accept", accept_header);
			jqXHR.setRequestHeader("Content-Type", accept_header);
			$("#ou-address").empty();	
			$('body').css('cursor','wait');			
		},
		success: function(data, textStatus, jqXHR){						

			$("#ou-address").html(
				get_html_by_template('js/ejs/adresse.js',data)
			);

			var myLatlng = new google.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude));
    		var myOptions = {
      			zoom: 16,
      			center: myLatlng,
      			mapTypeId: google.maps.MapTypeId.ROADMAP
    		};
    		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    		var addTitle = $('#kaddress').text();
			marker = new google.maps.Marker({
    			position: myLatlng,
    			title: addTitle
			});

			var infowindow = new google.maps.InfoWindow({
   				content: addTitle
			});

			// To add the marker to the map, call setMap();
			marker.setMap(map);

			google.maps.event.addListener(marker, 'click', function() {
  				infowindow.open(map,marker);
			});

		},
		error: function(jqXHR, textStatus, errorThrown){
			// alert('Error render_goog_map_by_amsid');
			display_error_msg(errorThrown);	
		},
		complete: function(jqXHR,textStatus){	
			$('body').css('cursor','auto');		
		}						
	});
 };

 /**
  *
  **/
var render_order_steps = function(steps){
	$("#ou-steps").empty();
	if(steps==undefined || steps == null){
		return;
	}
	// TODO - for simple html replace $.get to get the html content.
	$("#ou-steps").html(
		get_html_by_template('js/ejs/steps.js',steps)
	);

	$("#orderStepsGrid").jqGrid({				
  		datatype: "local",  				  		
    	colNames:['Varenummer','Step status', 'Kode', 'Id', 'Links'],
    	colModel:[
      		{name:'varenummer',index:'varenummer',sorttype:"string"},
      		{name:'step_status',index:'step_status'},
      		{name:'kode',index:'kode'},
      		{name:'id',index:'id',jsonmap:'id'},
      		{name:'links', index:'links', formatter: step_status_link}
    	],
    	id: 'id',
    	rowNum:10,
   		rowList:[10,20,30],
    	pager: '#os-pager',
    	viewrecords: true,
    	multiselect: false,
    	caption: "Ordre steps",    	
    	width: jq_grid_width_1,
	    height: '100%'
	}).navGrid('#os-pager',{edit:false,add:false,del:false});

	$.each(steps,function(i,step){
		$("#orderStepsGrid").jqGrid('addRowData',i+1,step);
	});

};  
/**
 *Resize the grid
 **/
var resize_the_grid=function() {
    $('#theGrid').fluidGrid({base:'#grid_wrapper', offset:-20});
};
/**
 *
 **/
var render_kunde_orders = function(korders) {
	$("#kunde-orders").empty();	

	if(korders == undefined || korders == null){
		return;
	}

	$("#kunde-orders").html(
		get_html_by_template('js/ejs/korders.js',korders)
	);

	$("#kundeOrderGrid").jqGrid({				
  		datatype: "local",  				  		
    	colNames:['UUID','Ordredato', 'Status', 'Salgskanal'],
    	colModel:[
    		{name:'uuid',index:'uuid',width:'280px',sorttype:"string",formatter:format_order_uuid},
    		{name:'ordredato',index:'ordredato'},
    		{name:'status',index:'status'},
    		{name:'salgskanal',index:'salgskanal'}      
    	],
    	rowNum:10,
	   	rowList:[10,20,30],
    	pager: '#ko-pager',
    	viewrecords: true,
    	multiselect: false,
    	caption: "Ordre by kunde",    	
    	width: jq_grid_width_1
	}).navGrid('#ko-pager',{edit:false,add:false,del:false});

	$.each(korders,function(i,order){
		$("#kundeOrderGrid").jqGrid('addRowData',i+1,order);				
	});
};
/**
 *
 **/
var format_order_uuid = function(cellvalue, options, rowObject) {
	return '<div style="cursor: pointer;" onclick="order_uuid_onclick(this);">' + cellvalue + '</div>'; 	
};
/**
 *
 **/
var order_uuid_onclick = function(cur){	
	$("#uuid").attr('value',$(cur).text());
	$("#uuid-b").trigger('click');
};
/**
 *
 **/
var render_order_aftaler = function(aftaler){
	$("#order-aftaler").empty();
	if(aftaler== undefined || aftaler==null){
		return;
	}
		
	$.each(aftaler, function(i, aftal){
		var aftalenr = '#' + aftal.aftalenr,
			aftalenr_pager = aftalenr + '-pager',
			aftalenr_caption = aftal.aftaletype + ' &gt;&gt; ' + aftal.aftalenr;

		$("#order-aftaler").append(
			get_html_by_template('js/ejs/aftaler.js',aftal)
		);	
				
		$(aftalenr).jqGrid({				
	  		datatype: "local",  				  		
	    	colNames:['Navn','Varenr','Varetype','Sorteringsgruppe'],
	    	colModel:[
	      		{name:'navn',index:'navn',sorttype:"string"},
	      		{name:'varenr',index:'varenr'},
	      		{name:'varetype',index:'varetype'},
	      		{name:'sorteringsgruppe',index:'sorteringsgruppe'}
	    	],	    	
	    	rowNum:10,
	   		rowList:[10,20,30],
	    	pager: aftalenr_pager,
	    	viewrecords: true,
	    	multiselect: false,	    	
	    	caption: aftalenr_caption,
	    	width: jq_grid_width_2,
	    	height: '100%'
		}).navGrid(aftalenr_pager,{edit:false,add:false,del:false});

		$.each(aftal.abonnementer,function(i,abonnement){
			$(aftalenr).jqGrid('addRowData',i+1,abonnement);
		});
	});			
};
/**
 *
 **/
var render_order_valgt = function(valgts){
	$('#order-valgt').empty();
	if(valgts == undefined || valgts == null){
		return;	
	}

	$.each(valgts, function(i, valgt){		
		var valgt_aftalenr = '#' + valgt.aftalenr + '-valgt',
			valgt_aftalenr_pager = valgt_aftalenr + '-pager',
			valgt_aftalenr_caption = valgt.aftaletype + ' &gt;&gt; ' + valgt.aftalenr;

		$('#order-valgt').append(
			get_html_by_template('js/ejs/valgt.js',valgt)
		);		
			
		$(valgt_aftalenr).jqGrid({				
	  		datatype: "local",  				  		
	    	colNames:['Navn','Varenr','Varetype','Sorteringsgruppe'],
	    	colModel:[
	      		{name:'navn',index:'navn',sorttype:"string"},
	      		{name:'varenr',index:'varenr'},
	      		{name:'varetype',index:'varetype'},
	      		{name:'sorteringsgruppe',index:'sorteringsgruppe'}
	    	],	    	
	    	rowNum:10,
	   		rowList:[10,20,30],
	    	pager: valgt_aftalenr_pager,
	    	viewrecords: true,
	    	multiselect: false,	    	
	    	caption: valgt_aftalenr_caption,
	    	width: jq_grid_width_2,
	    	height: '100%'
		}).navGrid(valgt_aftalenr_pager,{edit:false,add:false,del:false});
		
		$.each(valgt.varer,function(i,varer){
			$(valgt_aftalenr).jqGrid('addRowData',i+1,varer);
		});	

	});
};
/**
 *
 **/
var render_order_opsagt = function(opsagts){
	$('#order-opsagt').empty();
	if(opsagts==undefined || opsagts==null){
		return;
	}

	$.each(opsagts, function(i, opsagt){
		var opsagt_aftalenr = '#' + opsagt.aftalenr + '-opsagt',
			opsagt_aftalenr_pager = opsagt_aftalenr + '-pager',
			opsagt_aftalenr_caption = opsagt.aftaletype + ' &gt;&gt; ' + opsagt.aftalenr;

		$("#order-opsagt").append(
			get_html_by_template('js/ejs/opsagt.js',opsagt)
		);	
				
		$(opsagt_aftalenr).jqGrid({				
	  		datatype: "local",  				  		
	    	colNames:['Navn','Varenr','Varetype','Sorteringsgruppe'],
	    	colModel:[
	      		{name:'navn',index:'navn',sorttype:"string"},
	      		{name:'varenr',index:'varenr'},
	      		{name:'varetype',index:'varetype'},
	      		{name:'sorteringsgruppe',index:'sorteringsgruppe'}
	    	],	    	
	    	rowNum:10,
	   		rowList:[10,20,30],
	    	pager: opsagt_aftalenr_pager,
	    	viewrecords: true,
	    	multiselect: false,	    	
	    	caption: opsagt_aftalenr_caption,
	    	width: jq_grid_width_2,
	    	height: '100%'
		}).navGrid(opsagt_aftalenr_pager,{edit:false,add:false,del:false});

		$.each(opsagt.abonnementer,function(i,abonnement){
			$(opsagt_aftalenr).jqGrid('addRowData',i+1,abonnement);
		});
	});	
	
};
/**
 *
 **/
var get_html_by_template = function(temp_path,data){
	try{
		return (new EJS({url: temp_path})).render(data);
	}catch(err){
		console.log(err);
		return "";
	}		
};
/**
 * Recursive function to traverse the json object and convert into ul li format.
 */
var traverse_ou = function(key, jsonObj) {
    if( jsonObj!= null && typeof jsonObj == "object") {    	
        $.each(jsonObj, function(k,v) {             
            if( v != null && typeof v == "object" ){
            	gstr += '<li class="closed"><span class="folder">' + k + '</span><ul>'	
            	traverse(k, v); 
            	gstr += '</ul></li>';
            } else{
            	gstr += '<li><span class="file">' + k + ' :=> ' + v + '</span>'	
            }             
        });        
    }
    else {
        // jsonOb is a number or string
        gstr += '<li><span class="file">' + key + ' :=> ' + jsonObj + '</span></li>';
    }
};

/**
 * Function to render the json tree.
 */
var render_json_as_tree_ou=function(jsonObj){
	gstr='';
	var str = '<ul>';
	traverse_ou("",jsonObj);
	str += gstr + '</ul>';
	$('#ou-jstreeview').empty().html(str).treeview();	
};

/**
* Function to call step link
*/
var step_status_link = function (cellvalue, options, rowObject)
{
	var str = '';

	if(cellvalue != undefined && cellvalue != null) {
		$.each(cellvalue, function(i, link){
			str += '<div class="steplink" id="' + link.rel + '" onclick="handle_link_click_temp(this)" rel="' + link.rel +'" href="' + link.href + '">' + link.rel + '</div>';
			//str += '</br>';
		});
	}
   	return str;
};
/**
 *
 **/
var handle_link_click_temp = function(cur){
	return false;
};
/**
 * Function to call step webservices based on step status
 **/
var handle_link_click = function(cur){
	var rel=$(cur).attr('rel'),
		href=$(cur).attr('href');
	// ToDo based on relation decide method type PUT or DELETE
	var method_type='GET';

	if(rel == 'genkoertrin'){
		method_type='PUT';		
	}else if(rel == 'annullertrin'){
		method_type='DELETE';
	}	

	$.ajax({
 		url: href,
		processData:false,
		type: method_type,
		beforeSend:function(jqXHR, settings){			
			jqXHR.setRequestHeader("Accept", accept_header);
			jqXHR.setRequestHeader("Content-Type", accept_header);
			$('body').css('cursor','wait');
		},
		success: function(data, textStatus, jqXHR){						
			// Render the template with the movies data and insert
			// the rendered HTML under the "movieList" element	
			alert("Success");
		},
		error: function(jqXHR, textStatus, errorThrown){			
			display_error_msg(errorThrown);			
		},
		complete: function(jqXHR,textStatus){
			$('body').css('cursor','auto');
			$("button#uuid-b").trigger('click');
		}						
	});
};
/**
 * Display modal dialog with error message.
 **/
var display_error_msg = function(err){
	$('#derror').empty().html('<div id="dialog-modal" title="Error"><p>' + err +'</p></div>');	
	$( "#dialog-modal" ).dialog({
		height: 140,
		modal: true});	
};
/**
 * Display modal dialog with success message.
 **/
var display_success_msg = function(msg){	
	$('#derror').empty().html('<div id="dialog-modal" title="Info"><p>' + msg +'</p></div>');	
	$( "#dialog-modal" ).dialog({
		height: 140,
		modal: true});		
};
