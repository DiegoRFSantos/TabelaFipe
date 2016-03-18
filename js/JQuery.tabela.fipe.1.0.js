jQuery.fn.tabelaFipe = function (settings){

	var config = {
		marca:'',
		carros:'',
		modelos:'',
	}
	
	if(settings){$.extend(config, settings)};
	
	return this.each(function(){
		$.ajax({
			url:'http://fipeapi.appspot.com/api/1/carros/marcas.json',
			dataType:"jsonp",
			crossDomain:true,
			async:false,
			success: function(data){
				$('#'+config.marca).empty();
				var txt = "<option selected> --- </option>";
				$.each(data, function(index, element){
					txt+='<option value="'+element.id+'">'+element.name+'</option>';
				});
				$('#'+config.marca).html(txt);
			}
		});
		
		
		$(this).on("change", function(){
			$('#'+config.carros).empty();
			$('#'+config.modelos).empty()
			$.ajax({
				url:'http://fipeapi.appspot.com/api/1/carros/veiculos/'+$(this).val()+'.json',
				dataType:"jsonp",
				crossDomain:true,
				async:false,
				success: function(data){
					$('#'+config.carros).empty();
					$('#'+config.modelos).empty();
					var txt = "";
					$.each(data, function(index, element){
						txt+='<option value="'+element.id+'">'+element.name+'</option>';
					});
					$('#'+config.carros).html(txt);
				}
			});
		});
		
		$('#'+config.carros).on("change", function(){
			$.ajax({
				url:'http://fipeapi.appspot.com/api/1/carros/veiculo/'+$('#'+config.marca).val()+'/'+$(this).val()+'.json',
				dataType:"jsonp",
				crossDomain:true,
				async:false,
				success: function(data){
					$('#'+config.modelos).empty();
					var txt = "";
					$.each(data, function(index, element){
						txt+='<option value="'+element.id+'">'+element.name+'</option>';
					});
					$('#'+config.modelos).html(txt);
				}
			});
		});
		
	});

}