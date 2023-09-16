import React from 'react';
import {View, FlatList, StyleSheet, TextInput, Dimensions} from 'react-native';
import {Containter} from '../../components';
import NewsCommentCard from '../../components/NewsCommentCard';
import {colors} from '../../Styles/Styles';

const width = Dimensions.get('window').width;

//mock
const comments = [
  {
    image:
      'https://cojo.ru/wp-content/uploads/2022/12/mariia-zavgorodniaia-3.webp',
    name: 'Татьяна Рожина',
    comment:
      'Идейные соображения высшего порядка, а также новая модель организационной.',
    createdAt: '12.09.2023',
  },
  {
    image:
      'https://meragor.com/files/styles//ava_800_800_wm/sfztn_boy_avatar_1.jpg',
    name: 'Антон Воробьёв',
    comment: 'Брово!!',
    createdAt: '12.09.2023',
  },
  {
    image:
      'https://n1s2.hsmedia.ru/20/cc/9a/20cc9ac5bad1a9fff282a2ed6f741f42/807x807_0xc0a839a2_8097722801509115373.jpeg',
    name: 'Mark Starostin',
    comment:
      'Приятно, граждане, наблюдать, как элементы политического процесса объединены в целые кластеры себе подобных. Также как повышение уровня гражданского сознания не даёт нам иного выбора, кроме определения соответствующих условий активизации.',
    createdAt: '12.09.2023',
  },
];

const NewsComments = () => {
  return (
    <View style={styles.container}>
      <Containter>
        <FlatList
          data={comments}
          renderItem={({item}) => {
            return <NewsCommentCard commentItem={item} />;
          }}
          ItemSeparatorComponent={DevideCommentsCard}
        />
      </Containter>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ваш комментарий"
          multiline
        />
        <View style={styles.send} />
      </View>
    </View>
  );
};

export default NewsComments;

const DevideCommentsCard = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: colors.borderGray,
        marginVertical: 20,
      }}
    />
  );
};

console.log(width);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textInputContainer: {
    position: 'absolute',
    width,
    padding: 15,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  input: {
    backgroundColor: colors.bluishGray,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderGray,
    paddingHorizontal: 15,
    paddingVertical: 13,
    flex: 1,
    justifyContent: 'flex-end',
  },
  send: {
    aspectRatio: 1,
    backgroundColor: colors.orange,
    borderRadius: width / 2,
    marginLeft: 10,
  },
});
