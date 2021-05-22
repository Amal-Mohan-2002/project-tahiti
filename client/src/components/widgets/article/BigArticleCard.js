/* eslint-disable react/no-array-index-key */
import React from 'react';

// Libraries
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
// import { Bookmark, Share2 } from 'react-feather';
import { Link } from 'react-router-dom';
import moment from 'moment';

// Components
import RegularArticleCard from './RegularArticleCard';

// Utils
import getCategory from '../../../utils/determineCategory';

// Assets
import { DEFAULT_ARTICLE } from '../../../assets/placeholder/article';

const BigArticleCard = ({
  isWitsdom,
  isGallery,
  isPhotostory,
  article: articleProp,
}) => {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width: 600px)');

  const isDefaultArticle = !articleProp?.title;
  const article = isDefaultArticle ? DEFAULT_ARTICLE : articleProp;

  const getArticleLink = () => {
    if (isWitsdom) return `/article/${article.id}/${article.title}`;
    if (isGallery) return `/gallery/${article.id}/${article.title}`;
    if (isPhotostory) return `/photostory/${article.id}/${article.title}`;
    return `/article/${article.id}/${article.title}`;
  };

  const ArticleJSX = (
    <Card className={classes.root}>
      <img
        className={classes.cover}
        src={article.coverMedia.rectangle.storePath}
        alt='Cover'
      />

      <CardContent className={classes.cardDetails}>
        <div className={classes.container}>
          <div>
            <div className={classes.categoriesContainer}>
              {article.categories.slice().map(({ number }, index) => (
                <Typography
                  key={number}
                  variant='body2'
                  className={classes.category}
                >
                  {getCategory(number)}
                  {index === article.categories.length - 1 ? (
                    ''
                  ) : (
                    <span
                      style={{
                        textDecoration: 'none',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                      }}
                    >
                      |
                    </span>
                  )}
                </Typography>
              ))}
            </div>

            <Typography className={classes.title} variant='h2'>
              {article.title}
            </Typography>

            <div className={classes.wrapper}>
              <div className={classes.authorList}>
                {article.authors.map(({ name, id }, index) => (
                  <Link
                    to={`/portfolio/${id}/${name}`}
                    key={name}
                    target='_blank'
                    rel='noreferrer'
                    className={classes.link}
                  >
                    <Typography
                      variant='body2'
                      key={index}
                      className={classes.author}
                    >
                      {`${name}${
                        index === article.authors.length - 1 ? ' ' : ','
                      }`}
                    </Typography>
                  </Link>
                ))}
              </div>

              <div className={classes.readTime}>
                <i className='far fa-clock' />
                <Typography variant='body2' style={{ width: 'auto' }}>
                  {moment.duration(article.readTime, 'seconds').humanize()}
                </Typography>
              </div>
            </div>
            <Typography variant='body1' className={classes.articleDescription}>
              {article.inshort}
            </Typography>
          </div>

          <div className={classes.footer}>
            <div className={classes.line} />
            {/* <Share2 size={18} className={classes.icons} />
            <Bookmark size={18} className={classes.icons} /> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (matches)
    return (
      <RegularArticleCard
        {...{ isWitsdom, isGallery, isPhotostory }}
        article={article}
      />
    );

  return isDefaultArticle ? (
    ArticleJSX
  ) : (
    <Link
      to={getArticleLink()}
      target='_blank'
      rel='noopener noreferrer'
      style={{ textDecoration: 'none' }}
    >
      {ArticleJSX}
    </Link>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'space-between',

    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    boxShadow:
      '0px 0px 1px rgba(0, 0, 0, 0.24), 0px 1px 3px rgba(0, 0, 0, 0.12)',
  },
  cover: {
    width: '65%',
    height: 'auto',
  },

  cardDetails: {
    width: '35%',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    paddingTop: '4rem',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },

  categoriesContainer: {
    width: '100%',
    height: 'auto',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',

    marginBottom: '10px',
  },
  category: {
    width: 'auto',
    fontFamily: 'Source Sans Pro',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
    color: theme.palette.secondary.neutral70,
  },

  title: {
    fontFamily: 'IBM Plex Sans',
    fontWeight: '600',
    fontSize: '1.5rem',
    lineHeight: '2rem',
  },

  wrapper: {
    paddingTop: '0.75rem',
    color: theme.palette.secondary.neutral70,

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  authorList: {
    width: 'auto',
    maxWidth: '75%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    marginRight: '7px',
    marginTop: '5px',
  },
  author: {
    color: theme.palette.secondary.neutral70,
    fontFamily: 'Source Sans Pro',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
  },

  readTime: {
    width: 'auto',
    display: 'flex',
    '& i': {
      marginRight: '5px',
    },
  },

  articleDescription: {
    paddingTop: '1.5rem',
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
    lineHeight: '24px',
    fontSize: '16px',
    color: '#222222',
  },

  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '0rem',
  },
  line: {
    borderBottom: '1px solid ',
    borderColor: theme.palette.common.black,
    width: '-webkit-fill-available',
  },
}));

export default BigArticleCard;
