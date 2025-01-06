import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RichTextEditor = ({
  initialContent = '',
  onChangeContent,
  placeholder = 'Write something...',
  containerStyle,
}) => {
  const richText = useRef();

  const handleChange = text => {
    if (onChangeContent) {
      onChangeContent(text);
    }
  };

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={[styles.container, containerStyle]}>
      <View style={styles.sectionHeader}>
        <View style={styles.indicator} />
        <Text style={styles.sectionTitle}>Description</Text>
      </View>

      <View style={styles.editorContainer}>
        <View style={styles.toolbarWrapper}>
          <RichToolbar
            editor={richText}
            selectedIconTint="#6C63FF"
            iconTint="#666"
            actions={[
              'bold',
              'italic',
              'underline',
              'insertEmoji',
              'insertLink',
            ]}
            iconMap={{
              bold: () => <Text style={styles.toolbarButtonText}>B</Text>,
              italic: () => <Text style={styles.toolbarButtonText}>I</Text>,
              underline: () => <Text style={styles.toolbarButtonText}>U</Text>,
              insertEmoji: () => (
                <Icon name="insert-emoticon" size={20} color="#666" />
              ),
              insertLink: () => <Icon name="link" size={20} color="#666" />,
            }}
            style={styles.toolbarContent}
          />
        </View>

        <RichEditor
          ref={richText}
          initialContentHTML={initialContent}
          onChange={handleChange}
          placeholder={placeholder}
          initialHeight={200}
          useContainer={true}
          editorStyle={{
            backgroundColor: '#fff',
            contentCSSText: 'font-size: 16px; color: #333; padding: 12px;',
          }}
          style={styles.editor}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 16,
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
    marginBottom: 8,
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
    backgroundColor: '#fff',
    borderRadius: 8,
    minHeight: 200,
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
  toolbarButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  editor: {
    flex: 1,
    borderRadius: 8,
  },
});

export default RichTextEditor;
