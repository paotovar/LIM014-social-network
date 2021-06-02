import MockFirebase from 'mock-cloud-firestore';

import {
  createPost, getPosts, deletePost, updateLike,
} from '../src/model/firebase_posts.js';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        post1: {
          id: 'abc123',
          userId: 'abc',
          content: 'abcxyz',
          likes: '123',
          date: new Date(),
          state: '',
          img: '../img/abc.jpg',
        },
        post2: {
          id: 'abc1234',
          userId: 'abcd',
          content: 'abcxyza',
          likes: '1234',
          date: new Date(),
          state: '',
          img: '../img/abcd.jpg',
        },
      },
    },
    comments: {
      __doc__: {
        comment1: {
          commDocId: '123',
          commText: 'abc',
          commDate: new Date(),
          commUserName: 'abc',
          commUserPhoto: '../img/abc.jpg',
          commPostId: 'post2',
        },
      },
    },
  },
};
global.firebase = new MockFirebase(fixtureData);

describe('createPost', () => {
  it('Debería crear un post', (done) => createPost('../img/abc.jpg', 'abc', 'abc123', 'abcxyz', [], '')
    .then(() => getPosts(
      (data) => {
        const result = data.find((post) => post.content === 'abcxyz');
        expect(result.content).toBe('abcxyz');
        done();
      },
    )));
});

describe('deletePost', () => {
  it('It should update a post', (done) => deletePost('post1')
    .then(() => getPosts(
      (data) => {
        const result = data.find((post) => post === 'post1');
        expect(result).toBe(undefined);
        done();
      },
    )));
});
describe('updateLike', () => {
  it('Debería dar los likes', (done) => updateLike('post2', '1234')
    .then(() => getPosts(
      (data) => {
        const result = data.find((post) => post.likes === '1234');
        expect(result.likes).toBe('1234');
        done();
      },
    )));
});
