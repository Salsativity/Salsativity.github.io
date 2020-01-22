function queryString(parm){
 var p={};
 location.search.replace(/[?&;]+([^=]+)=([^&;]*)/gi,function(s,k,v){p[k]=v})
 return parm?p[parm]:p;
}
