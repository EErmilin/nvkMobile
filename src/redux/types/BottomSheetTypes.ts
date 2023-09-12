import React from 'react';
import {BottomSheetHandle} from '../../components/BottomSheet';

export interface IBottomSheet {
  reviewModalRef: React.MutableRefObject<BottomSheetHandle | undefined> | null;
  isOpen: boolean;
}
