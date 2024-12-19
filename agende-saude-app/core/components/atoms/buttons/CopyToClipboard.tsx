import React, { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import { displaySuccessMessage } from '@/core/utils/toast.utils';
import FlatButton from './FlatButton';
import { CopyToClipboardProps } from '@/core/vo/types/components.props';

const CopyToClipboard: React.FC<CopyToClipboardProps> = (props) => {
    const { text } = props;

    const [isCopying, setIsCopying] = useState(false);

    const copyConcluded = (): void => {
        displaySuccessMessage('Copiado!', 'O texto foi copiado para o clipboard.');
        setIsCopying(false);
    }

    const copyToClipboard = async () => {
        setIsCopying(true);
        Clipboard.setStringAsync(text)
            .then(() => copyConcluded());
    };

    return (
        <FlatButton 
            type='primary' 
            ghost 
            onPress={copyToClipboard} 
            icon='content-copy'
            disabled={isCopying} 
        />
    );
};

export default CopyToClipboard;