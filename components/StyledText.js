import React from 'react';
import { Text } from './Themed';
export function MonoText(props) {
    return React.createElement(Text, { ...props, style: [props.style, { fontFamily: 'SpaceMono' }] });
}
//# sourceMappingURL=StyledText.js.map