<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Navigation from '@/components/Navigation.vue'
</script>

<template>
  <Header />
  <Navigation />
  <RouterView :key="$route.path" />
  <Footer />
</template>

<style lang="scss">
body {
  min-height: 100vh;
  color: var(--mms-black);
  line-height: 1.6;
  // font-family: 'Lineto Akkurat', Arial, Helvetica, sans-serif;
  font-family: 'Sora', sans-serif;
  font-size: 14px;
  font-weight: 200 !important;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

strong, b {
  font-weight: 700;
}

@keyframes listItemAnimation {
  0% {
    left: -10px;
    opacity: 0;
  }
  100% {
    left: 0;
    opacity: 1;
  }
}

.mms__header {
  // height: 90px;
  background-color: var(--mms-black-90);
  color: var(--mms-white);
  border-bottom: 1px solid var(--mms-grey-50);
}

.mms__header-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: end;
  height: 100%;
  padding: var(--space-small);
}

@media (min-width: 1200px) {

  .mms__header-inner  {
    padding: var(--space-small) 0;
  }
}

.mms-header__logo {
  height: 38px;
  width: 76px;
  display: block;
  position: relative;
  top: 1px;
  background-image: url("./assets/images/mms-logo-white.svg");
  transition: opacity 200ms linear;
}

.mms-header__logo:hover {
  opacity: .75;
}

.mms__header-content span {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
}

@media (min-width: 920px) {
  .mms__header-content span {
    font-size: 1.6rem;
  }
}

.mms__search-row {
  height: 67px;
  max-height: 0;
  overflow: hidden;
  border-top: 1px solid transparent;
  opacity: 0;
  transition: max-height 200ms linear, border-color 200ms linear, opacity 200ms linear;
}
.mms__search-row--visible {
  max-height: 200px;
  border-top: 1px solid var(--mms-grey-50);
  opacity: 1;
}

.mms__search-input-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: var(--space-small) 0 !important;
}

.mms__search-input {
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: 1px solid var(--mms-grey-50);
  padding: 0 var(--space-small);
  font-size: 1rem;
  margin: 0 10px;
  transition: border-color 200ms linear;
}

.mms__search-input,
.mms__search-input::placeholder {
  color: var(--mms-white);
}

@media screen and (min-width: 1200px) {

  .mms__search-input {
    margin: 0;
  }
}

.mms__search-input:focus {
  box-shadow: none;
  outline: none;
  border-color: var(--mms-white);
}

.mms-nav {
  position: sticky;
  top: 0;
  z-index: 999;
}

.mms__nav-top {
  border-bottom: 1px solid var(--mms-grey-50);
  background-color: var(--mms-black-90);
  box-shadow: 0 6px 6px 0 rgb(0 0 0 / 10%);
}

.mms__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-small);
}

.mms__container--main {
  min-height: calc(100vh - 157px);
}

.mms__container--border-top {
  border-top: 1px solid var(--mms-grey-50);
}

@media screen and (min-width: 1200px) {

  .mms__container {
    padding: 0;
  }
}

.mms__article {
  padding: 60px var(--space-small);
  min-height: calc(100vh - 157px);
}

@media screen and (min-width: 1200px) {

  .mms__article {
    padding: 100px var(--space-small);
  }
}

.mms__main-navigation {
  display: flex;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

.mms__main-navigation * {
  color: var(--mms-white) !important;
}

.mms__main-navigation .mms__main-navigation-li {
  font-size: .75rem;
  padding: 20px;
  position: relative;
  cursor: pointer;
  font-weight: 700;
  transition: opacity 200ms linear;
}

@media screen and (min-width: 756px) {

  .mms__main-navigation .mms__main-navigation-li {
    font-size: 1rem;
  }
}

.mms__main-navigation .mms__main-navigation-li:first-of-type {
  padding-left: 0;
}

.mms__main-navigation .mms__main-navigation-li:after {
  content: "";
  height: 50%;
  width: 1px;
  background-color: var(--mms-grey-50);
  position: absolute;
  display: block;
  top: 23px;
  right: 0;
}

.mms__main-navigation .mms__main-navigation-li:last-of-type:after {
  display: none;
}

@media screen and (min-width: 756px) {

  .mms__main-navigation .mms__main-navigation-li:after {
    height: 20px;
  }
}

.mms__main-navigation .mms__main-navigation-li:hover,
.mms__sub-navigation-container .mms__sub-navigation li:hover {
  opacity: .8;
}

.mms__main-navigation .mms__main-navigation-sub-li ul {
  padding: 0 40px;
}

.mms__main-navigation .mms__main-navigation-li:last-of-type .mms__main-navigation-sub-li ul {
  border-right: none;
}

.mms__main-navigation-external-link-icon {
  position: relative;
  top: 3px;
  left: 12px;
}

.mms__sub-navigation-container {
  padding: 40px 0;
  display: flex;
  min-height: 265px;
}

.mms__sub-navigation-container .mms__sub-navigation {
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  border-right: 1px solid var(--mms-grey-50);
  padding-right: 40px;
  margin-right: 40px;
}

.mms__sub-navigation-container .mms__sub-navigation li {
  padding: 4px 0;
  color: var(--mms-black-50);
  cursor: pointer;
  transition: color 200ms linear;
}

.mms__sub-navigation-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mms__sub-navigation-container ul li {
  display: flex;
}

.mms__main-navigation-li--active .mms__sub-navigation-container {
  display: block;
}

.mms__main-navigation .mms__main-navigation-li:hover .mms__sub-navigation-container,
.mms__main-navigation .mms__main-navigation-li:hover .mms__main-navigation-sub-li {
  display: block;
}

.mms__main-navigation-sub-li {
  color: var(--mms-white);
  min-width: 200px;
  min-height: 100px;
  display: flex;
  margin-top: 20px;
}

.mms__main-navigation-sub-li:first-of-type {
  margin-top: 0;
}

.mms__main-navigation-sub-li-item {
  padding: 0 20px 0 40px;
  min-width: 100px;
}

@media screen and (min-width: 1200px) {

  .mms__main-navigation-sub-li-item {
    padding: 0 80px 0 40px;
    min-width: 200px;
  }
}

.mms__main-navigation-sub-li-item:first-of-type {
  padding-left: 0;
  border-right: 1px solid var(--mms-grey-50);
}

.mms__main-navigation-sub-li-item a {
  color: var(--mms-white);
  cursor: pointer;
  text-decoration: none;
}

.mms__main-navigation-sub-li-item span,
.mms__main-navigation-sub-li-item a {
  padding: 4px 0;
  display: inline-block;
  font-weight: 700;
  opacity: 0;
  animation: listItemAnimation 200ms 1 forwards;
}

.mms__main-navigation-sub-li-item span,
.mms__main-navigation-sub-li-item a,
.mms__main-navigation svg {
  transition: opacity 200ms linear;
}

.mms__main-navigation-sub-li-item a:hover,
.mms__main-navigation svg:hover,
.router-link-active {
  opacity: .5 !important;
}

.mms__main-navigation svg,
.mms__main-navigation-sub-li-item span svg {
  position: relative;
  top: 24px;
  cursor: pointer;
  margin-left: 20px;
}

.mms__main-navigation-sub-li-item span svg {
  top: 4px;
  margin-left: 10px;
}

.mms__footer {
  background-color: var(--mms-black-90);
  color: var(--mms-white);
  padding-bottom: 40px;
  border-top: 1px solid var(--mms-grey-50);
}

.mms__footer-content {
  padding: 40px var(--space-small);
  border-bottom: 1px solid var(--mms-grey-50);
}

@media screen and (min-width: 756px) {

  .mms__footer-content {
    display: flex;
  }
}

.mms__footer-content:last-of-type {
  border-bottom: none;
}

.mms__footer-content--small {
  padding: 10px var(--space-small);
  margin-bottom: 10px;
  text-align: center;
}

.mms__footer-content--small p {
  margin: 0 auto;
}

.mms__footer-content--item {
  padding-right: 40px;
  margin-right: 40px;
  margin-bottom: 20px;
}

@media screen and (min-width: 756px) {

  .mms__footer-content--item {
    margin-bottom: 0;
    border-right: 1px solid var(--mms-grey-50);
  }
}

.mms__footer-content--item:last-of-type {
  padding-right: 0;
  margin-right: 0;
  margin-bottom: 0;
  border-right: none;
}

.mms__footer-content--item p,
.mms__footer-content--item a {
  color: var(--mms-white);
}

.mms__footer-content--item a {
  text-decoration: none;
  transition: opacity 200ms linear;
  font-weight: 700;
}

.mms__footer-content--item a:hover {
  opacity: .5;
}

.mms__footer-content--item ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.mms-languages {
  display: flex;
  justify-content: flex-end;
}

.mms-languages button {
  background: transparent;
  padding: 0 0 0 10px;
  margin: 0 0 10px 10px;
  border: none;
  // border-left: 1px solid var(--mms-grey-50);
  color: var(--mms-white);
  cursor: pointer;
  transition: opacity 200ms linear;
  outline: none !important;
}



.mms-languages button svg {
  position: relative;
  top: 2px;
}

.mms-languages button:hover {
  opacity: .5;
}

.mms-languages button.active {
  font-weight: 700;
}
</style>
