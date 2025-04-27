import React from 'react';
import { 
  User, 
  Users, 
  FileText, 
  Heart, 
  Shield, 
  Menu, 
  X, 
  Edit, 
  MapPin, 
  Camera 
} from 'lucide-react';

export const getIconByName = (iconName) => {
  switch (iconName) {
    case 'user':
      return User;
    case 'users':
      return Users;
    case 'fileText':
      return FileText;
    case 'heart':
      return Heart;
    case 'shield':
      return Shield;
    case 'menu':
      return Menu;
    case 'x':
      return X;
    case 'edit':
      return Edit;
    case 'mapPin':
      return MapPin;
    case 'camera':
      return Camera;
    default:
      return User;
  }
};