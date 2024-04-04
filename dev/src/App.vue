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
@use "nswow";

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
</style>