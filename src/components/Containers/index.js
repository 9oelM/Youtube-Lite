import React from "react"
import { connect } from "react-redux"
import TopNav from "../TopNav/TopNav"
import SearchResultPanel from "../SearchResult/SearchResultPanel"
import ContentGrid from "../Layout/ContentGrid"
import PlaylistDialog from "../PlaylistDialog/PlaylistDialog"
import PlaylistsPanel from "../Playlists/PlaylistsPanel"
import VideoPlaylists from "../VideoPlayer/VideoPlaylists"
import SettingsLists from "../SettingsLists/SettingsLists"
import BottomNav from "../BottomNav/BottomNav"
import VideoPlayer from "../VideoPlayer/VideoPlayer"
import {
  toggleDrawer,
  receiveSearch,
  requestSearch,
  addToPlaylist,
  deleteFromPlaylist,
  addPlaylist,
  deletePlaylist,
  adjustSettings,
  watchVideo,
  startVideo,
  pauseVideo,
} from "../../actions/index"

export const TopNavContainer = connect(
  state => ({
    isDrawerOpen: state.viewReducer.isDrawerOpen,
    settings: state.settingsReducer.settings,
  }),
  dispatch => ({
    onToggle() {
      dispatch(toggleDrawer())
    },
    onSearchResults(results) {
      dispatch(receiveSearch(results))
      console.log(results)
    },
    onSearchTrigger(searchWord) {
      dispatch(requestSearch(searchWord))
    },
  })
)(TopNav)

export const SearchResultPanelContainer = connect(
  state => ({
    searchResults: state.searchReducer.searchResults,
  }),
  null
)(SearchResultPanel)

export const ContentGridContainer = connect(
  state => ({
    isFetching: state.searchReducer.isFetching,
  }),
  null
)(ContentGrid)

export const PlaylistDialogContainer = connect(
  state => ({
    playlists: state.playlistReducer.playlists,
  }),
  dispatch => ({
    onAddToPlaylist(video, playlistName) {
      dispatch(addToPlaylist(video, playlistName))
      console.log("added: " + JSON.stringify(video))
    },
    onAddPlaylist(playlistName) {
      dispatch(addPlaylist(playlistName))
      console.log("added playlist: " + playlistName)
    },
  })
)(PlaylistDialog)

export const PlaylistsPanelContainer = connect(
  state => ({
    playlists: state.playlistReducer.playlists,
  }),
  null
)(PlaylistsPanel)

export const VideoPlaylistsContainer = connect(
  state => ({
    playlists: state.playlistReducer.playlists,
  }),
  null
)(VideoPlaylists)

export const SettingsListsContainer = connect(
  state => ({
    settings: state.settingsReducer.settings,
  }),
  dispatch => ({
    onAdjustSettings(settings) {
      dispatch(adjustSettings(settings))
    },
  })
)(SettingsLists)

export const BottomNavContainer = connect(
  state => ({
    settings: state.settingsReducer.settings,
  }),
  null
)(BottomNav)

export const VideoPlayerContainer = connect(
  null,
  dispatch => ({
    onStartVideo() {
      dispatch(startVideo())
    },
    onPauseVideo() {
      dispatch(pauseVideo())
    },
    onWatchVideo() {
      dispatch(watchVideo())
    },
  })
)(VideoPlayer)
