import React, { FC } from "react";
import classNames from "classnames";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";
import BuggyButton from "../../components/error-boundary/BuggyButton";
import mainStyle from "../../styles/main.module.css";
import style from "./aboutPage.module.scss";

const AboutPage: FC = () => (
  <div className={mainStyle.wrapper}>
    <div className={classNames(style.content, mainStyle.content, mainStyle.shadowContainer)}>
      <h1 className={style.title}>Why We Like Video Games</h1>
      <p>
        What draws nearly half of all older Americans — and an even larger percentage of those younger than us — to play
        so many games on a phone, computer or console hooked up to a TV?
      </p>
      <p>
        The easy answer is that it is a temporary escape from the pressures of the real world — an essential
        distraction, particularly over this past year. And yes, lots of online games qualify as wonderful diversions:
        Countless Americans pass some time each day playing sudoku, Candy Crush, Angry Birds and other puzzle games on
        their phones or tablets.
      </p>
      <p>
        But that is just one segment of the gaming market. Step beyond the fast-gratification phone games, and you
        emerge into a world where the player is more than ever an active participant in a game is narrative. Your
        decisions and actions impact where the story goes, as opposed to watching a film or TV, during which you are a
        passive couch potato.
      </p>
      <p>
        A good game lets you not only depart your reality but also create a new one. You are not restricted by your age,
        height, gender or physical disabilities.
      </p>
      <p>
        To understand gaming, forget the technology and focus on the humanity. It is in our nature to join the fray, to
        learn the rules and master the system, to build things (and for some of us, to blow them up), to gain and lose,
        to chill out and chalk up -— and even brag about our scores — to spin entire worlds from only our imaginations.
      </p>
      <p>
        No surprise that the tensions of the pandemic brought more people into the gaming fold. A survey by Deloitte, a
        professional services company, found that 34 percent of those surveyed had tried a new video gaming activity in
        2020. Those activities range from playing a new game to subscribing to a game service to watching someone else
        play in the growing phenomenon called e-sports. And industry analysts say a lot of those people are likely to
        remain engaged.
      </p>
      <div>
        <br />
        <ErrorBoundary>
          <BuggyButton />
        </ErrorBoundary>
      </div>
    </div>
  </div>
);

export default AboutPage;
