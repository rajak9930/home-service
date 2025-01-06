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
import WebView from 'react-native-webview';

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

  // Ensure the keyboard avoiding view behaves correctly
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
        <View style={styles.toolbar}>
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
            contentCSSText: 'font-size: 16px; color: #333;',
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
    backgroundColor: '#fff',
    borderRadius: 8,
    minHeight: 300,
  },
  toolbar: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  toolbarContent: {
    backgroundColor: 'transparent',
  },
  editor: {
    flex: 1,
    borderRadius: 8,
    padding: 8,
  },
});

export default RichTextEditor;
