/**
 * nforge.board.js
 */
nforge.namespace("board");

/**
 * PostList
 */

nforge.board.list = function() {
    var that = {
        "init" : function() {
            that.setUpEventListener();
        },

        "setUpEventListener" : function() {
            var $headers = $("#order a");
            $headers.click(that.onHeader);
            
            var $pagination = $("#pagination a");
            $pagination.click(that.onPager);
        },

        "onHeader" : function() {
            var key = $(this).attr("key");
            var $input = $("#option_form input[name=key]");
            if (key !== $input.val()) {
                $input.val(key)
            } else {
                $input = $("#option_form input[name=order]");
                if ($input.val() === "desc"){
                	$input.val("asc");
                } else if ($input.val() === "asc") {
                	$input.val("desc");
                }
            }
            $("#option_form").submit();
            return false;
        },

        "onPager" : function() {
            var $input = $("#option_form input[name=pageNum]");
            $input.val($(this).attr("pageNum"));
            $("#option_form").submit();
            return false;
        }
    };
    
    return that;
};

nforge.board.vaildate = function() {
    var that = {
        "init" : function() {
            $("form").submit(function() {
                if ($("input#title").val() === "" || $("textarea#contents").val() === "") {
                    $("#warning button").click(function(){
                        $('#warning').hide();
                    });
                    $('#warning').show();
                    return false;
                }
                return true;
            });
        }
    };
    return that;
};

/**
 * PostView
 */
nforge.board.view = function() {
    var that = {
        "init" : function(filesUrl) {
            var attachments;

            fileUploader.init({
            	"elTarget"    : $('#upload'),   // upload area
            	"elTextarea"  : $('#contents'), // textarea
            	"sTplFileItem": $('#tplAttachedFile').text(),
            	"sAction"     : filesUrl
            });
            
            attachments = $('.attachments');
            for (var i = 0, nLength = attachments.length; i < nLength; i++) {
                fileDownloader($(attachments[i]), filesUrl);
            }
        }
    }

    return that;
};

/**
 * newPost
 */
nforge.board.new = function() {
	var that = {
		"init": function(filesUrl) {
            fileUploader.init({
            	"elTarget"    : $('#upload'),   // upload area
            	"elTextarea"  : $('#contents'), // textarea
            	"sTplFileItem": $('#tplAttachedFile').text(),
            	"sAction"     : filesUrl
            });
		}
	};

	return that;
};


// Alias
nforge.board.edit = nforge.issue.new;
