import React from 'react';
import labels from '../../../assets/labels';
import { Link } from 'react-router-dom';

const Header  = () => <Link to="/"><h2>{ labels.appTitle }</h2></Link>;

export default Header;
