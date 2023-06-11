import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';
import React, { useState } from 'react';
import css from './App.module.css';

const INITIAL_STATE = {
  good: 0,
  neutral: 0,
  bad: 0,
};

export const App = () => {
  const [feedback, setFeedback] = useState({ ...INITIAL_STATE });

  const handleRefresh = () => {
    setFeedback({ ...INITIAL_STATE });
  };

  const handleLeaveFeedback = nameFeedback => {
    setFeedback(prevState => ({
      ...prevState,
      [nameFeedback]: prevState[nameFeedback] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good, neutral, bad } = feedback;
    return Math.floor((good / (good + neutral + bad)) * 100 || 0);
  };

  const { good, neutral, bad } = feedback;

  return (
    <div className={css.container}>
      <button className={css.refreshButton} onClick={handleRefresh}>
        Refresh
      </button>
      <Section title="Please Leave feedback">
        <FeedbackOptions
          options={Object.keys(feedback)}
          onLeavefeedback={handleLeaveFeedback}
        />
      </Section>

      <Section title="Statistics">
        {countTotalFeedback() === 0 ? (
          <Notification message="There is no feedback yet..." />
        ) : (
          <Statistics
            options={Object.keys(feedback)}
            statistic={feedback}
            total={good + neutral + bad}
            positivePercentage={countPositiveFeedbackPercentage}
          />
        )}
      </Section>
    </div>
  );
};
