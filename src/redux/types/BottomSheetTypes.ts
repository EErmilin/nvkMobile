import React from 'react';
import {BottomSheetHandle} from '../../components/BottomSheet';

export interface IBottomSheet {
  reviewSheet: React.MutableRefObject<BottomSheetHandle | undefined | null>;
  isOpen: boolean;
}
