(function () {
  "use strict";
  var nuke = function(state) {
    var branch_actions = $('.branch-actions');
    $.each(branch_actions, function() {
      var first_child = this.children[0];
      if (first_child === undefined)
        return;
      if ($(first_child).attr('class') !== 'd-inline-block text-right')
        return;
      var a = $(first_child.children[1]);
      if (a.hasClass(state)) {
        var form = this.children[1];
        if (form === undefined)
          return;
        var button = form.children[1];
        $(button).click();
      }
    });
  };

  var nuke_all = function() {
    $('.branch-delete').click();
  };

  var create_button = function(text, func) {
    var li = $('<li>', {class: 'nuke-github-branches'});
    var a = $('<a>', {class: 'btn btn-sm btn-danger js-menu-target'});
    a.text(text);
    a.click(func);
    li.prepend(a);
    return li;
  };

  var append_buttons = function() {
    if ($('.nuke-github-branches').length !== 0)
      return;
    var nav = $('.pagehead-actions');
    nav.prepend(create_button('☢ All', nuke_all));
    nav.prepend(create_button('☢ Merged', function() {nuke('State--purple')}));
    nav.prepend(create_button('☢ Closed', function() {nuke('State--red')}));
  };

  var render = function() {
    var url = window.location.pathname;
    var is_branch_page = url.endsWith('/branches') ||
                         url.endsWith('/branches/yours') ||
                         url.endsWith('/branches/stale') ||
                         url.endsWith('/branches/all') ||
                         url.endsWith('/branches/active');
    if (is_branch_page) {
      append_buttons();
    }
  };

  function pathChange() {
    this.old_path = window.location.pathname;
    this.interval;

    var that = this;
    var detect = function() {
      var curr_path = window.location.pathname;
      if (that.old_path != curr_path) {
        that.old_path = curr_path;
        setTimeout(render, 1000);
      }
    };
    this.interval = setInterval(detect, 100);
  }

  var pc = new pathChange();
  $(document).ready(render);
})();
