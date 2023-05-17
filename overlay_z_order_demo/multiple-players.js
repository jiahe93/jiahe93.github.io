/*
 * Copyright 2017 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */
/* jshint esversion: 6 */

'use strict';

var $ = document.getElementById.bind(document);

var scenario = $('scenario');
var inputFile = $('input-file');

var video_box = $('video-area');
var vb_width = video_box.offsetWidth;
var vb_height = video_box.offsetHeight;
console.log("video_box: ", vb_width, "x", vb_height);
var remote_size_select = $('remote-view-size');


var startTestButton = $('start-test');
var testStarted = false;
var remote_view_player = null;
var local_view_player = null;

window.onload = function () {
}

startTestButton.onclick = startTest;

function logError(err) {
  console.error(err);
}

function addNewVideoElement(id, input) {
  var video = document.createElement('video');
  video.id = id;

  video.autoplay = true;
  video.muted = true;
  video.controls = false;
  video.playsinline = true;
  video.loop = true;

  if (id == "remote-view") {
    // video.width = video_box.offsetWidth;
    video.height = video_box.offsetHeight;
  }
  video.src = input;

  // document.body.appendChild(video);
  video_box.appendChild(video);
  return video;
}

function Player(id, input) {
  this.id = id;
  this.view = addNewVideoElement(id, input);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function create11Call(input_video, size_level) {
  // Create remote view
  remote_view_player = new Player("remote-view", inputFile.value);
  // Create local view
  local_view_player = new Player("local-view", inputFile.value);
  
}

function createScenario(sc, input_video, size_level) {
  var nPlayers = 0;
  switch(sc) {
    case "1:1":
      nPlayers = 2;
      create11Call(input_video, size_level);
      break;

    default:
      alert("Unsupported scenario!");
      
  }
}

function updateData() {

}

function remoteSizeSelectionChanged() {
  console.log(remote_size_select.value);
  remote_view_player.view.height = video_box.offsetHeight * Math.sqrt(parseFloat(remote_size_select.value) / 100);
  setTimeout(updateData, 1000);
}

function startTest() {
  if (testStarted) {
    alert("Test already started!");
    return;
  }
  testStarted = true;
  createScenario(scenario.value, inputFile.value, remote_size_select.value);
  remote_size_select.addEventListener("change", remoteSizeSelectionChanged);
  setTimeout(updateData, 1000);
  
}
