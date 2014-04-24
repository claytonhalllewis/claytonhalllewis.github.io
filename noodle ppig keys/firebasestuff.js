function save()
{
      var dictNewStart=headings[headings.length-1].start;
      console.log("dictNewStart is "+dictNewStart);
      var dictNew=buildNew(dict,dictNewStart);
      fb.set(dictNew);
}
function buildNew(dict,dictNewStart)
{
       var dictPos=0;
	var dictNew={};
	for(var sel in dict)
	{ 
		console.log("dictPos is "+dictPos);
		if (dictPos>=dictNewStart)
		{
			dictNew[sel]=dict[sel];
		}
		dictPos=dictPos+1;
	}
	console.log(dictNew);
	return dictNew;
}
function load()
{
   
      
      fb.once('value',
      function(snapshot){var dictNew; dictNew=snapshot.val();
                         var dictNewCount=0;
			 console.log(dictNew);
                         for(var sel in dictNew)
                         {
		            dict[sel]=dictNew[sel];
		            dictNewCount=dictNewCount+1;
                         }
                         headings[headings.length-1]["length"]=dictNewCount;
			 palette.updatePalette(palette.buildPaletteFromDict());
                         }
			
      );
}
