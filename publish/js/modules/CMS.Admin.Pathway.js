VHV.CMS.Admin.Pathway=class{static getPathwayItem(){let pathway=$('#region-pathway-last-item'),pathwayLastItem=$('.pathway-last-item'),ul=pathway.parents('ul:first');if(!pathway.find('>.ActionWrapper>span.icon-li').length){pathway.find('>.ActionWrapper')
.prepend('<span class="icon-li margin-h-2xs title-sm"><i class="vi vi-chevron-right"></i> </span>');}
setTimeout(function(){if(!pathway.html()){pathway.remove();}},800);pathway.find('>.ActionWrapper>li').each(function(_index){let currentSort=$(this).attr('data-sort');if(!$(this).hasClass('li')){$(this).addClass('li');}
if($(this).parents('ul:first,ol:first').children('li[data-sort="'+currentSort+'"]').length){$(this).remove();return;}
if($(this).prev('span.icon-li').length){pathway.before($(this));}
else{pathway.before($(this).prepend('<span class="icon-li margin-h-2xs title-sm"><i class="vi vi-chevron-right"></i> </span>'));}
setTimeout(function(){if(!pathwayLastItem.prev('.li').find('.icon-li').length){pathwayLastItem.prev('.li').prepend('<span class="icon-li margin-h-2xs title-sm"><i class="vi vi-chevron-right"></i> </span>');}},100);});setTimeout(function(){ul.find('li:last-child').addClass('last-item text-bold');},800);}}