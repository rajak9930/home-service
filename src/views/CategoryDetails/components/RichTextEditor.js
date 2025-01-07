import React, {useRef} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {useCustomTheme} from '../../../theme/Theme';
import Colors from '../../../constants/colors';

const RichTextEditor = ({
  initialContent = '',
  onChangeContent,
  placeholder = 'Write something...',
}) => {
  const richText = useRef();
  const theme = useCustomTheme();

  const isDarkMode = theme === 'dark';

  const handleChange = text => {
    if (onChangeContent) {
      onChangeContent(text);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? Colors.navBg : Colors.pureWhite,
        },
      ]}>
      <View style={styles.sectionHeader}>
        <View style={styles.indicator} />
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? Colors.pureWhite : '#333',
            },
          ]}>
          Description
        </Text>
      </View>

      <View
        style={[
          styles.editorContainer,
          {
            backgroundColor: isDarkMode ? '#29303C' : Colors.pureWhite,
          },
        ]}>
        <View style={styles.toolbarWrapper}>
          <RichToolbar
            editor={richText}
            selectedIconTint="#6C63FF"
            iconTint="#666"
            actions={[
              'bold',
              'italic',
              'underline',
              // 'unorderedList',
              // 'orderedList',
              'link',
            ]}
            style={styles.toolbarContent}
          />
        </View>

        <RichEditor
          ref={richText}
          initialContentHTML={initialContent}
          onChange={handleChange}
          placeholder={placeholder}
          initialHeight={170}
          useContainer={true}
          // eslint-disable-next-line react-native/no-inline-styles
          editorStyle={{
            backgroundColor: isDarkMode ? '#29303C' : Colors.pureWhite,
            contentCSSText: `font-size: 16px; color: ${
              isDarkMode ? Colors.pureWhite : '#333'
            }; padding: 12px 0 12px 12px;`,
          }}
          style={styles.editor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.pureWhite,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  indicator: {
    width: 4,
    height: 20,
    backgroundColor: '#CABDFF',
    borderRadius: 2,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  editorContainer: {
    backgroundColor: Colors.pureWhite,
    borderRadius: 8,
    minHeight: 170,
  },
  toolbarWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 8,
  },
  toolbarContent: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },

  editor: {
    flex: 1,
    borderRadius: 8,
  },
});

export default RichTextEditor;
