import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import BlogerProfile_Photo_icon from '../../../assets/icons/BlogerProfile_Photo_icon';
import BlogerProfile_Video_icon from '../../../assets/icons/BlogerProfile_Video_icon';
import BlogerProfile_Audio_icon from '../../../assets/icons/BlogerProfile_Audio_icon';
import BlogerProfile_Bottom_icon from '../../../assets/icons/BlogerProfile_Bottom_icon';

interface BlogerContentTabBarProps {
  tabs: string[];
  activeTab: number;
  goToPage: (index: number) => void;
}

const BlogerContentTabBar: React.FC<BlogerContentTabBarProps> = ({
  tabs,
  activeTab,
  goToPage,
}) => {
  return (
    <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: 'gray',
            height: 47,
            paddingTop: 10,
          }}>
          {tab === 'photo' && (
            <BlogerProfile_Photo_icon
              active={activeTab === index}
              onPress={() => goToPage(index)}
            />
          )}
          {tab === 'video' && (
            <BlogerProfile_Video_icon
              active={activeTab === index}
              onPress={() => goToPage(index)}
            />
          )}
          {tab === 'audio' && (
            <BlogerProfile_Audio_icon
              active={activeTab === index}
              onPress={() => goToPage(index)}
            />
          )}
          {activeTab === index && <BlogerProfile_Bottom_icon />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BlogerContentTabBar;

const styles = StyleSheet.create({});
