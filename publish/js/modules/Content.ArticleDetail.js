VHV.Content.ArticleDetail=class extends VHV.Content.HTML{contrast=3
lastContrast=-1
initEvents(){let that=this;if(VHV.request('preview')){this.preview=1;}
if(this.lastContrast===-1){this.lastContrast=$('body').css('background-color');if(!this.lastContrast){this.lastContrast='#FFF';}}
super.initEvents();that.setContrast();$('.article-content img').css({'height':'auto',});$(window).resize(function(){$('.article-content img').css({'height':'auto',});});this.saveHistory(this.itemId);$('#article'+that.id+' .content-detail img').each(function(){if(!$(this).parent().attr('href')){$(this).wrap('<a class="view-gallery"></a>');$(this).parent().attr({"href":$(this).attr('src')})}});VHV.load('3rdparty/jQuery/lightGallery-master/dist/css/lightgallery.css');VHV.load('3rdparty/jQuery/lightGallery-master/dist/js/lightgallery-all.js',function(){$("#module"+that.id).lightGallery({selector:'.view-gallery'});});if($('#rating-star'+that.id).length){VHV.load('3rdparty/jQuery/bootstrap-star-rating/css/star-rating.min.css');VHV.load('3rdparty/jQuery/bootstrap-star-rating/js/star-rating.min.js',function(){$('#rating-star'+that.id).rating({step:1,filledStar:'<i class="vi vi-star"></i>',emptyStar:'<i class="vi vi-star"></i>',showCaption:false,showClear:false});$("#rating-star"+that.id).rating().on("rating.change",function(event,value){if(that.hasRating&&value){that.responseRating(event,value);$("#rating-star"+that.id).rating("refresh",{disabled:true,showClear:false});}
else{VHV.alert("Bình chọn đã kết thúc!",{'type':'error'});}});});}
if(that.$('.hover-star').length){VHV.load('3rdparty/jQuery/star-rating/jquery.rating.css');VHV.load('3rdparty/jQuery/star-rating/jquery.rating.pack.js',function(){let sr=0;that.$('.hover-star').rating({focus:function(value,link){let tip=$('#rating-label'+that.id);if(sr!=2){tip[0].data=tip[0].data||tip.html();tip.html(link.title||'value: '+value);sr=1;}},blur:function(){let tip=$('#rating-label'+that.id);if(sr!=2){$('#hover-test').html(tip[0].data||'');sr=1;}},callback:function(value){if(sr==1&&value){sr=2;that.$('.hover-star').rating('disable');VHV.Model('Content.Article.rating')({itemId:that.itemId,star:value},function(response){if(response){if(typeof(response)==='string'){response=JSON.parse(response);}
switch(response.status){case'SUCCESS':$('#stringrating'+that.id+' .totalStar').text(response.totalStar);$('#stringrating'+that.id+' .totalRating').text(response.totalRating);break;case'DUPLICATE':$('#stringrating'+that.id).text("Bạn đã bình chọn trước đó!");break;default:VHV.alert("Có lỗi xảy ra!",{'type':'error'});break;}}});}}});if(that.currentRating){that.$('.hover-star').rating('select',Math.round(that.currentRating-1));}});}
$('#viewArticle'+that.id).on('click',function(){if($(this).hasClass('active1')){$(this).removeClass('active1').text("Hiển thị tin liên quan");$('.relatedArticles').addClass('hidden');}
else{$(this).addClass('active1').text("Ẩn tin liên quan");$('.relatedArticles').removeClass('hidden');}});$('.status-link').on('click',function(){if($(this).hasClass('status-link')){$('.status-link').text("Đã sao chép");}});$('#article'+that.id+' .content-detail table').wrap('<div class="table-responsive"></div>');$('#module'+that.id+' .content-detail iframe,#module'+that.id+' .content-detail embed,#module'
+that.id+' .content-detail object')
.each(function(){$(this).wrap('<div class="videoWrapper"></div>');});}
responseRating(event,value){VHV.Model('Content.Article.rating')({itemId:that.itemId,star:value},function(response){if(response){if(typeof(response)==='string'){response=JSON.parse(response);}
switch(response.status){case'SUCCESS':VHV.alert("Cám ơn bạn đã bình chọn",{type:'success'});that.reloadModule();break;case'DUPLICATE':VHV.alert("Bạn đã bình chọn trước",{type:'error'});that.reload();break;default:VHV.alert(response.message||"Có lỗi xảy ra!",{'type':'error'});break;}}});}
reloadModule(){setTimeout(function(){that.reload();},1000);}
saveHistory(id){let history=localStorage.getItem('viewArticleHistory');history=history?history.split(','):[];if(history.length>20){history.pop();}
history.unshift(id);localStorage.setItem('viewArticleHistory',history.join(','));}
copyToClipboard(element){let $temp=$("<input>");$("body").append($temp);$temp.val($(element).html()).select();document.execCommand("copy");$temp.remove();}
setContrast(contrast){if(contrast==='dec'){if(this.contrast>0){this.contrast--;}}
else if(contrast==='inc'&&this.contrast<3){this.contrast++;}
let bgColor=this.lastContrast;switch(this.contrast){case 0:bgColor="#DCDCDC";break;case 1:bgColor="#F5F5F5";break;case 2:bgColor="#F8F8FF";break;default:break;}
$("body").css("background-color",bgColor);}
fontCustom(val){let that=this;$('#module'+that.id+' .article-content [style*="font-size"]').css({'font-size':'inherit'});if(val==='small'){$('#module'+that.id+' .font-size-text').css({'font-size':'0.875rem','line-height':1.4});}
else if(val==='medium'){$('#module'+that.id+' .font-size-text').css({'font-size':'1rem','line-height':1.4});}
else if(val==='large'){$('#module'+that.id+' .font-size-text').css({'font-size':'1.25em','line-height':1.47});}}
sendMail(){let that=this;$('#loadDetailLayout'+that.id).loadModule('Content.Form',{layout:'Article.News.DetailLayout.sendMail',gridModuleParentId:''+that.id,itemId:that.itemId,},function(){$('#modal'+that.id).modal({keyboard:false,backdrop:'static'});});}
addBookmark(id,type,title){let that=this;if(id&&type&&title){VHV.Model('Content.Bookmark.edit')({'objectId':id,'objectType':type,'objectTitle':title},function(response){if(typeof(response)==='string'){response=JSON.parse(response);}
if(response.status==='SUCCESS'){VHV.alert("Lưu dấu trang thành công",{type:'success'});setTimeout(function(){location.reload();},2000);}
else{VHV.alert(response.message||'Lưu thất bại.',{type:'error'});}});}
return false;}
removeBookmark(id,objectId){let that=this;if(id||objectId){VHV.Model('Content.Bookmark.delete')({id:id??'',objectId:objectId??''},function(response){if(typeof(response)==='string'){response=JSON.parse(response);}
if(response.status==='SUCCESS'){VHV.alert("Bỏ lưu dấu trang thành công",{type:'success'});setTimeout(function(){location.reload();},2000);}
else{VHV.alert('Có lỗi xảy ra vui lòng thử lại.',{type:'error'});}});}}
printArticle(){let that=this;VHV.load('3rdparty/jQuery/jprintArea/jquery.VHVPrintArea.js',function(){let printArea=window.open(VHV.buildURL({page:'Article.Print.detail',id:that.itemId}),location.href,"width=600,height=600");printArea.moveTo(10,10);});}
readArticleByJS(element){if(!this.speechVoice){let voices=speechSynthesis.getVoices();this.speechVoice=voices[0];for(let i in voices){if(voices[i].localService){this.speechVoice=voices[i];break;}}}
let that=this;if(element){let isReading=$(element).data('isReading');if(isReading==='1'){$(element).data('isReading','2').text("Đọc tiếp");window.speechSynthesis.pause();return;}
$(element).text("Dừng đọc").data('isReading','1');if(isReading==='2'){window.speechSynthesis.resume();return;}}
let message=new SpeechSynthesisUtterance($('#module'+that.id+' .title-detail').text()),text=decodeURIComponent($('#module'+that.id+' .article-brief').text()+' '
+$('#module'+that.id+' .content-detail,#module'
+that.id+' .article-content.common-content').text()),i=0;let f=function(){if(i<text.length){let p=text.indexOf('.',parseInt(i)+100);for(let j in{'.':1,':':1,',':1,'(':1,' ':1}){if((p>i+300)||(p===-1)){let p2=text.indexOf(j,parseInt(i)+120);if(p2!==-1){p=p2;}}
else{break;}}
if(p===-1){p=Math.min(i+100,text.length);}
message.text=text.substring(parseInt(i),p);window.speechSynthesis.speak(message);i=parseInt(p,10)+1;}};message.voice=this.speechVoice;message.volume=1;message.onend=f;message.onerror=f;window.speechSynthesis.speak(message);}
readArticle(element){let that=this;if(VHV.language==='en'){VHV.ExecQueue.add(function(){that.readArticleByJS(element);},function(){return window.speechSynthesis.getVoices()?.length;});return;}
let audio=$('#audio'+that.id+' audio')[0],audioSrc='/api/CMS/Article/speech?';if(element){let isReading=$(element).data('isReading'),selectVoice=$('.speech-section [name="voice"]'),voice=selectVoice.val();selectVoice.attr('disabled','disabled');if(isReading==='1'){$(element).data('isReading','2').text("Đọc tiếp");audio.pause();return;}
$(element).text("Dừng đọc").data('isReading','1');if(isReading==='2'){audio.play();return;}
if(voice){audioSrc='/api/CMS/Article/speech?voice='+voice+'&';}}
audio.src=audioSrc+'text='+encodeURIComponent($('#module'+that.id+' .title-detail').text());audio.play();$(audio).off();let text=decodeURIComponent($('#module'+that.id+' .article-brief').text()
+' '+$('#module'+that.id+' .content-detail,#module'+that.id
+' .article-content.common-content').text()),i=0;let f=function(){if(i<text.length){let p=findPunctuation(text,i+200);if(handleEndOfText(p,i,audio,element)){i=0;return;}
p=(p===-1)?Math.min(i+200,text.length):p;if(p<=i){audio.stop();$(element).data('isReading','0').text("Đọc bài");i=0;return;}
audio.src=audioSrc+'text='+encodeURIComponent(text.substring(i,p));i=p+1;audio.play();}
function findPunctuation(text,startIndex){let punctuationMarks={'.':1,':':1,',':1,'(':1,' ':1};let p=text.indexOf('.',startIndex);for(let mark in punctuationMarks){if((p>(i+300))||(p===-1)){let p2=text.indexOf(mark,(i+200)-50);if(p2!==-1){p=p2;}}
else{break;}}
return p;}
function handleEndOfText(text,currentIndex,audio,element){if(currentIndex===-1){audio.stop();$(element).data('isReading','0').text("Đọc bài");return true;}
return false;}};audio.addEventListener('ended',f);audio.addEventListener('error',f);}}
$('body').append(`<style>

.article-content video {

    max-width: 100%;

}

</style>`);;VHV.Content.ArticleDetail.parentClass=VHV.Content.HTML;