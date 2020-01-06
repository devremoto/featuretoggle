// loremizer.js
// @author Pedro Bauzá
// @date 24/02/2015
var loremIpsumWords = new Array(
"#Lorem","ipsum","dolor","sit","amet,","consectetur","adipiscing","elit.","Donec","et","tempor","risus,","sed","tempor","velit.","Phasellus","ut","maximus","nulla.","Curabitur","sit","amet","maximus","nulla.","Class","aptent","taciti","sociosqu","ad","litora","torquent","per","conubia","nostra,","per","inceptos","himenaeos.","Suspendisse","vitae","ullamcorper","augue.","Nulla","vel","interdum","mauris,","eu","porttitor","libero.","Nulla","convallis","neque","vel","augue","pretium,","et","blandit","diam","porttitor.","Pellentesque","at","ligula","ipsum.","Vivamus","faucibus","nec","felis","a","efficitur.","Nam","eu","dui","pellentesque,","sagittis","magna","et,","dapibus","nulla.","Maecenas","congue","sodales","turpis","non","tempus.","Integer","tristique","blandit","est,","quis","congue","massa","aliquet","in.","Duis","commodo","ullamcorper","arcu,","et","vulputate","quam.",
"#Proin","quis","commodo","augue.","Fusce","placerat","viverra","gravida.","Phasellus","commodo","euismod","felis,","in","dignissim","ex","mollis","in.","Nunc","finibus","posuere","nibh","at","luctus.","Sed","vel","erat","eleifend,","commodo","risus","vel,","volutpat","neque.","Curabitur","et","augue","in","quam","vehicula","scelerisque","a","vel","ligula.","Aenean","ultrices","mollis","ligula,","ac","luctus","nunc","pulvinar","sed.","Cras","tristique,","urna","ullamcorper","porta","finibus,","quam","erat","molestie","lectus,","eu","mattis","velit","erat","a","tellus.","Nam","dapibus","tellus","vitae","dapibus","congue.",
"#Aliquam","non","est","arcu.","Maecenas","id","ipsum","ut","libero","rutrum","vehicula","sed","sit","amet","quam.","Nunc","tempor","hendrerit","leo,","a","aliquet","nibh","suscipit","tristique.","Sed","eu","vestibulum","lacus.","Pellentesque","tincidunt","quis","leo","consectetur","aliquet.","Nulla","scelerisque","in","lacus","ut","interdum.","Vivamus","id","justo","metus.","Mauris","volutpat","lectus","sit","amet","est","venenatis,","at","sodales","enim","placerat.","Curabitur","semper","sollicitudin","leo","nec","malesuada.","Donec","convallis","ex","vitae","nisi","ullamcorper,","non","porttitor","nisl","cursus.","In","sit","amet","nunc","eleifend,","mattis","nulla","eu,","elementum","orci.","Vestibulum","tincidunt","felis","id","ex","pretium,","nec","porta","justo","convallis.","Pellentesque","id","ex","suscipit,","molestie","tortor","eu,","ullamcorper","lectus.","Maecenas","faucibus","dapibus","magna","sed","convallis.","Praesent","nec","lectus","sed","mi","porttitor","sodales."
);

$( document ).ready(function() {
    
    var defaultWordCount = 15;
    var maxWordCount = 285;
    
    $('[loremizer]').each(function( index ) {
        var numWords = $(this).attr('loremizer-words');
        var nodot = $(this).attr('loremizer-nodot');
        var nop = $(this).attr('loremizer-no-p');
        var justify = $(this).attr('loremizer-justify');
        if (numWords==null) {
            numWords = defaultWordCount;
        }
        if (numWords>maxWordCount) {
            numWords = maxWordCount;
        }
        $(this).html(loremWords(numWords, (nop===undefined?false:true), (nodot===undefined?false:true), (justify===undefined?false:true)));
    });
});

function strEndsWith(str, suffix) {
    return str.match(suffix+"$")==suffix;
}

function strStartsWith(str, prefix) {
    return str.indexOf(prefix) === 0;
}

function loremWords(numWords, nop, nodot, justify) {
    var text = '';
    for (var iAux=0 ; iAux<numWords; iAux++) {
        var word = loremIpsumWords[iAux];
        if (strStartsWith(word, '#')) {
            word = word.substr(1, word.length);
            if (text.length!=0) {
                text += (!nop?'</p>':'');
            }
            text += (!nop?'<p'+(justify?' class="to-justify"':'')+'>':'')+word;
        } else {
            text += ' '+word;
        }
    }
    if (strEndsWith(text,',')) {
        text = text.substr(0, text.length-1);
    }
    if (!nodot && !strEndsWith(text,'.')) {
        text += '.';
    }
    text += (!nop?'</p>':'');
    return text;
}