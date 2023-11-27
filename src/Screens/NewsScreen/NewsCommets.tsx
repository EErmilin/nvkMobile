import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Containter} from '../../components';
import NewsCommentCard from '../../components/NewsCommentCard';
import {colors} from '../../Styles/Styles';
import SendMessage_icon from '../../assets/icons/SendMessage_icon';
import {RootNavigationTabProps} from '../../navigation/types/RootStackTypes';
import {useQuery} from '@apollo/client';
import {POST_COMMENTS} from '../../gql/query/posts/Post';
import {IPostComment} from '../../models/Post';
import {getUpdateClient} from '../../requests/updateHeaders';
import {useAppSelector} from '../../redux/hooks';
import {CREATE_POST_COMMENT} from '../../gql/mutation/post/CreatePostComment';

const width = Dimensions.get('window').width;

const NewsComments: React.FC<RootNavigationTabProps<'Comments'>> = ({
  route,
}) => {
  const postId = route.params.postId;
  const {data, refetch} = useQuery<{postComments: IPostComment[]}>(
    POST_COMMENTS,
    {
      variables: {postId},
    },
  );

  const [commentText, setCommentText] = React.useState('');
  const [commentSending, setCommentSending] = React.useState(false);
  const user = useAppSelector(state => state.user.data);

  const sendComment = React.useCallback(async () => {
    if (!commentText.trim() || !user) {
      return;
    }
    setCommentSending(true);
    try {
      const client = await getUpdateClient();
      await client.mutate({
        mutation: CREATE_POST_COMMENT,
        variables: {
          createPostCommentInput: {
            content: commentText,
            userId: user.id,
            authorId: user.author?.id,
            postId,
          },
        },
      });

      await refetch();

      setCommentText('');
    } catch (e) {
      console.log(e);
    } finally {
      setCommentSending(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentText, user, postId]);

  return (
    <View style={styles.container}>
      <Containter>
        <FlatList
          data={data?.postComments ?? []}
          renderItem={({item}) => <NewsCommentCard commentItem={item} />}
          ItemSeparatorComponent={DevideCommentsCard}
        />
      </Containter>
      {user && (
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ваш комментарий"
            multiline
            value={commentText}
            onChangeText={setCommentText}
          />
          <TouchableOpacity
            style={styles.send}
            activeOpacity={0.7}
            disabled={commentSending}
            onPress={sendComment}>
            <SendMessage_icon />
          </TouchableOpacity>
        </View>
      )}
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
    alignItems: 'flex-end',
    backgroundColor: colors.white,
  },
  input: {
    backgroundColor: colors.bluishGray,
    minHeight: 55,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderGray,
    paddingHorizontal: 15,
    paddingVertical: 13,
    flex: 1,
    justifyContent: 'flex-end',
  },
  send: {
    width: 55,
    height: 55,
    backgroundColor: colors.orange,
    borderRadius: width / 2,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
