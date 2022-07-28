import React from 'react';
import { Links } from '../api/links';
import Header from './components/Header';
import LinkCreate from './components/LinkCreate';
import LinkList from './components/LinkList';

export const App = () => (
  <>
    <Header/>
    <LinkCreate/>
    <LinkList/>
  </>
);
