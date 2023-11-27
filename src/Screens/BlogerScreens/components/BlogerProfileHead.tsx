import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Button} from '../../../components';
import TextWithMore from '../../../components/TextWithMore';
import DropDown_Icon from '../../../assets/icons/DropDown_Icon';
import {ShowSocialModalizeHandle} from './ShowSocialModal';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {getUpdateClient} from '../../../requests/updateHeaders';
import {CHANGE_SUBSCRIBE} from '../../../gql/mutation/user/ChangeSubscribe';
import {ISubscribeArg} from '../../../redux/types/AuthorTypes';
import {setIsSubscribe} from '../../../redux/slices/screensSlice';

const {width} = Dimensions.get('screen');

type TProps = {
  profile?: any;
  openSocial?: () => void;
};

const BlogerProfileHead = ({profile, openSocial}: TProps) => {
  const authorData = useAppSelector(state => state.screens.authorData);
  return (
    <View style={styles.container}>
      <View style={styles.head_wraper}>
        <FastImage
          source={{uri: authorData?.author?.avatar?.url}}
          style={styles.profile_image}
        />
        <CountElement
          title="Публикации"
          count={authorData?.authorAggregate?.postsCount ?? 0}
        />
        <CountElement
          title="Подписчиков"
          count={authorData?.authorAggregate?.subsCount ?? 0}
        />
        <CountElement
          title="Подписки"
          count={authorData?.authorAggregate?.followsCount ?? 0}
        />
      </View>

      <AboutBloger text={authorData?.author?.description ?? ''} />
      <SocialInfo openSocial={openSocial} />
    </View>
  );
};

export default BlogerProfileHead;

type TCountElementProps = {
  title: string;
  count: number;
};

const CountElement = ({title, count}: TCountElementProps) => (
  <View style={styles.countElement_wraper}>
    <Text style={styles.countElement_count}>{count}</Text>

    <Text style={styles.countElement_title}>{title}</Text>
  </View>
);

type TAboutBlogerProps = {
  text: string;
};

const AboutBloger = ({text}: TAboutBlogerProps) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <View style={styles.about_wraper}>
      <TextWithMore text={text} />
    </View>
  );
};

type TSocialInfo = {
  openSocial?: () => void;
};

const SocialInfo = ({openSocial}: TSocialInfo) => {
  const authorData = useAppSelector(state => state.screens.authorData);
  const user = useAppSelector(state => state.user);
  const isSubscribe = useMemo(
    () => authorData?.authorIsSubscribe.isSubscribe,
    [authorData],
  );
  const isVisibleSoc = useMemo(
    () =>
      !!authorData?.author?.vk ||
      !!authorData?.author?.telegram ||
      !!authorData?.author?.youtube ||
      !!authorData?.author?.odnoklassniki,
    [authorData],
  );
  const socialButtonInput = (
    <View style={styles.social_showButton_inputWrapper}>
      <Text style={styles.social_showButton_inputText}>Соц. сети</Text>
      <DropDown_Icon />
    </View>
  );

  const isVisibleSubscribe = user.author?.author.id !== authorData?.author.id;
  const [changingSubscribe, setChangingSubscribe] = useState(false);
  const dispatch = useAppDispatch();

  const onChangeSubscribe = useCallback(async () => {
    setChangingSubscribe(true);
    try {
      const client = await getUpdateClient();
      client.mutate<{}, ISubscribeArg>({
        mutation: CHANGE_SUBSCRIBE,
        variables: {
          authorId: authorData?.author.id as number,
          userId: user.data?.id as number,
          isSubscribe: !isSubscribe,
        },
      });
      dispatch(setIsSubscribe({isSubscribe: !isSubscribe}));
    } finally {
      setChangingSubscribe(false);
    }
  }, [isSubscribe, authorData, user]);

  return (
    <View style={styles.social_wraper}>
      {isVisibleSubscribe ? (
        <Button
          title={isSubscribe ? 'Отписаться' : 'Подписаться'}
          style={styles.social_subscribeButton}
          onPress={onChangeSubscribe}
          loading={changingSubscribe}
        />
      ) : (
        <View />
      )}

      {isVisibleSoc && (
        <Button
          title="Соц. сети"
          icon={<DropDown_Icon />}
          style={styles.social_showButton}
          textStyle={{color: '#000'}}
          onPress={openSocial}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 15,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  head_wraper: {
    height: 90,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profile_image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  countElement_wraper: {
    height: 42,
    justifyContent: 'space-between',
  },
  countElement_title: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
  },
  countElement_count: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 14,
  },
  about_wraper: {
    marginTop: 20,
    width: '100%',
  },
  about_text: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 14,
    lineHeight: 24,
  },
  about_text_else: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#F6A80B',
  },
  social_wraper: {
    width: '100%',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  social_subscribeButton: {
    width: 155,
    height: 40,
  },
  social_showButton: {
    width: 155,
    height: 40,
    backgroundColor: 'transparent',
  },
  social_showButton_inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  social_showButton_inputText: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 14,
    marginRight: 8,
  },
});
