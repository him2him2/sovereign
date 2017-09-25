import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';
import { gui } from '/lib/const';

import './sidebar.html';
import '../../components/collective/collective.js';
import '../../widgets/inbox/inbox.js';

function drawSidebar() {
  if (Session.get('sidebar') === true && $('#menu').css('margin-left') === `-${gui.SIDEBAR_WIDTH_PERCENTAGE}%`) {
    Session.set('sidebar', false);
  }
}

Template.sidebar.onRendered(() => {
  $('.left').width(`${gui.SIDEBAR_WIDTH_PERCENTAGE}%`);

  drawSidebar();

  $(window).resize(() => {
    const sidebarPixelWidth = parseInt(($(window).width() * gui.SIDEBAR_WIDTH_PERCENTAGE) / 100, 10);
    if (!Session.get('sidebar')) {
      $('#menu').css('margin-left', parseInt(0 - sidebarPixelWidth, 10));
    } else {
      let newRight = 0;
      if ($(window).width() < gui.MOBILE_MAX_WIDTH) {
        newRight = parseInt(0 - sidebarPixelWidth, 10);
      }
      $('#content').css('left', sidebarPixelWidth);
      $('#content').css('right', newRight);
    }
  });
});

Template.sidebar.helpers({
  decisions() {
    return Session.get('menuDecisions');
  },
  personal() {
    return Session.get('menuPersonal');
  },
  delegates() {
    return Session.get('menuDelegates');
  },
});
