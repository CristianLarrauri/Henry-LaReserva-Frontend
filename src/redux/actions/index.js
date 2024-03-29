import axios from "axios";
export const CREATE_TOURNAMENT = "CREATE_TOURNAMENT";
export const GET_ALL_TOURNAMENTS = "GET_ALL_TOURNAMENTS";
export const NAME_SORT = "NAME_SORT";
export const GENDER_FILTER = "GENDER_FILTER";
export const DIV_FILTER = "DIV_FILTER";
export const SEARCH_TOURNAMENTS = "SEARCH_TOURNAMENTS";
export const TOURNAMENT_DETAILS = "TOURNAMENT_DETAILS";
export const GET_TOURNAMENTS_HOME = "GET_TOURNAMENTS_HOME";
export const CREATE_PLAYER = "CREATE_PLAYER";
export const GET_SCORERS_TABLE = "GET_SCORERS_TABLE";
export const CREATE_TEAM = "CREATE_TEAM";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const CREATE_USER = "CREATE_USER";
export const BAN_USER = "BAN_USER";
export const TO_ADMIN = "TO_ADMIN";
export const GET_USER_DETAILS = "GET_USER_DETAILS";
export const GET_NEXT_FIVE_TOURNAMENTS = "GET_NEXT_FIVE_TOURNAMENTS";
export const GET_NEXT_TOURNAMENT = "GET_NEXT_TOURNAMENT";
export const GET_TOURNAMENTS_ADMIN = "GET_TOURNAMENTS_ADMIN";
export const DELETE_TOURNAMENT = "DELETE_TOURNAMENT";
export const MODIFY_TOURNAMENTS = "MODIFY_TOURNAMENTS";
export const GET_REVIEWS = "GET_REVIEWS";
export const POST_REVIEWS = "POST_REVIEWS";
export const DELETE_REVIEWS = "DELETE_REVIEWS";
export const GET_ID_REVIEW = "GET_ID_REVIEW";
export const SET_ACTUAL_USER = "SET_ACTUAL_USER";
export const GET_ENABLED_REVIEWS = "GET_ENABLED_REVIEWS";
export const GET_DISABLED_REVIEWS = "GET_DISABLED_REVIEWS";
export const REPORT_REVIEW = "REPORT_REVIEW";
export const PUT_FIXTURE = "PUT_FIXTURE";
export const DELETE_USER = "DELETE_USER";
export const ADD_POINT = "ADD_POINT";
export const QUIT_POINT = "QUIT_POINT";
export const ADD_GOAL = "ADD_GOAL";
export const QUIT_GOAL = "QUIT_GOAL";

export const createTournament = (payload) => {
  return async function (dispatch) {
    try {
      const info = await axios.post(
        "/tournaments",
        payload
      );

      return dispatch({
        type: CREATE_TOURNAMENT,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const modifyTournaments = (
  id,
  name,
  amountOfTeams,
  dateInit,
  dateFinish,
  genre,
  category,
  description
) => {
  return async function (dispatch) {
    try {
      const info = await axios.put(
        `/tournaments/${id}`,
        {
          name,
          amountOfTeams,
          dateInit,
          dateFinish,
          genre,
          category,
          description,
        }
      );
      return dispatch({
        type: MODIFY_TOURNAMENTS,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createPlayers = (payload) => {
  return async (dispatch) => {
    try {
      const info = await axios.post(
        "/players",
        payload
      );
      return dispatch({
        type: CREATE_PLAYER,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createTeam = (payload) => {
  return async (dispatch) => {
    try {
      const info = await axios.post(
        "/teams",
        payload
      );
      return dispatch({
        type: CREATE_TEAM,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllTournaments = (
  page,
  order,
  property,
  category,
  genre,
  state
) => {
  return async (dispatch) => {
    try {
      const info = await axios.get(
        `/tournaments?page=${page}&order=${order}&property=${property}&category=${category}&genre=${genre}&state=${state}`
      );
      dispatch({
        type: GET_ALL_TOURNAMENTS,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTournamentsAdmin = (payload) => {
  return async (dispatch) => {
    try {
      const info = await axios.get(
        "/tournaments/panel"
      );
      return dispatch({
        type: GET_TOURNAMENTS_ADMIN,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const tournamentDetails = (id) => {
  return async function (dispatch) {
    try {
      const info = await axios.get(
        `/tournaments/${id}`
      );
      return dispatch({
        type: TOURNAMENT_DETAILS,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const putFixture = (id, payload) => {
  return async (dispatch) => {
    try {
      const obj = { fixture: payload };
      const info = await axios.put(
        `/tournaments/${id}`,
        obj
      );
      dispatch({
        type: PUT_FIXTURE,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addPoint = (id) => {
  return async (dispatch) => {
    try {
      const info = await axios.put(
        `/teams/add/${id}`
      );
      dispatch({
        type: ADD_POINT,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const quitPoint = (id) => {
  return async (dispatch) => {
    try {
      const info = await axios.put(
        `/teams/quit/${id}`
      );
      dispatch({
        type: QUIT_POINT,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const addGoal = (id) => {
  return async (dispatch) => {
    try {
      const info = await axios.put(
        `/players/add/${id}`
      );
      dispatch({
        type: ADD_GOAL,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const quitGoal = (id) => {
  return async (dispatch) => {
    try {
      const info = await axios.put(
        `/players/quit/${id}`
      );
      dispatch({
        type: QUIT_GOAL,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchTournaments = (name) => {
  return async function (dispatch) {
    try {
      const info = await axios.get(
        `/tournaments?name=${name}`
      );
      return dispatch({ type: SEARCH_TOURNAMENTS, payload: info.data });
    } catch (error) {
      return dispatch({
        type: SEARCH_TOURNAMENTS,
        payload: [],
      });
    }
  };
};

export const getTournamentsHome = (page, order, property) => {
  return async (dispatch) => {
    try {
      const info = await axios.get(
        `/home?page=${page}&order=${order}&property=${property}`
      );
      dispatch({
        type: GET_TOURNAMENTS_HOME,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllUsers = (payload) => {
  return async (dispatch) => {
    try {
      const info = await axios.get(
        "/users",
        payload
      );
      dispatch({
        type: GET_ALL_USERS,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createUser = (payload) => {
  return async (dispatch) => {
    try {
      const info = await axios.post(
        "/users/post",
        payload
      );
      dispatch({
        type: CREATE_USER,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const banUser = (id) => {
  return async (dispatch) => {
    try {
      const info = await axios.put(
        `/users/ban/${id}`
      );
      dispatch({
        type: BAN_USER,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const toAdmin = (id) => {
  return async (dispatch) => {
    try {
      const info = await axios.put(
        `/users/admin/${id}`
      );
      dispatch({
        type: TO_ADMIN,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserDetails = (email) => {
  return async function (dispatch) {
    const info = await axios.get(
      `/users/${email}`
    );
    return dispatch({
      type: GET_USER_DETAILS,
      payload: info.data,
    });
  };
};

export const deleteUser = (email) => {
  return async function (dispatch) {
    try {
      const info = await axios.delete(
        `/users/${email}`
      );
      return dispatch({
        type: DELETE_USER,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function postOrder(tournamentId) {
  return async function (dispatch) {
    try {
      const newOrder = await axios({
        method: "post",
        url: "/order",
        data: { tournamentId },
      });
      return dispatch({
        type: "NEW_ORDER",
        payload: newOrder.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
export function getNext5Tournaments() {
  return async (dispatch) => {
    try {
      const nextTournaments = await axios.get(
        "/next?index=1&limit=5"
      );

      dispatch({
        type: GET_NEXT_FIVE_TOURNAMENTS,
        payload: nextTournaments.data,
      });
    } catch (err) {
      console.error(err.message);
    }
  };
}

export function getNextTournament() {
  return async (dispatch) => {
    try {
      const nextTournament = await axios.get(
        "/next?index=0&limit=1"
      );

      dispatch({
        type: GET_NEXT_TOURNAMENT,
        payload: nextTournament.data,
      });
    } catch (err) {
      console.error(err.message);
    }
  };
}

export function deleteTournament(id) {
  return async (dispatch) => {
    try {
      const info = await axios.put(
        `/tournaments/enabled/${id}`
      );
      dispatch({
        type: DELETE_TOURNAMENT,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// --------------------------------------------------
// Aqui todas las actions necesarias para MercadoPago

export function getMercadoPago(orderId) {
  return async function (dispatch) {
    try {
      const mp = await axios.get(`/mercadopago/${orderId}`);
      return dispatch({
        type: "MP_DATA",
        payload: mp.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

/* -----------------------------------------Necesarias para reviews------------------------------------------------------------------------------*/

export function getReviews() {
  return async function (dispatch) {
    try {
      const info = await axios.get(
        `/reviews`
      );
      console.log("info", info.data);
      return dispatch({
        type: "GET_REVIEWS",
        payload: info.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function postReviews(payload) {
  return async function (dispatch) {
    try {
      const info = await axios.post(
        `/reviews`,
        payload
      );
      return dispatch({
        type: "POST_REVIEWS",
        payload: info.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function deleteReviews(id) {
  return async function (dispatch) {
    try {
      const info = await axios.delete(
        `/reviews/${id}`
      );
      return dispatch({
        type: "DELETE_REVIEWS",
        payload: info.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getIdReview(id) {
  return async function (dispatch) {
    try {
      const info = await axios.get(
        `/reviews/${id}`
      );
      return dispatch({
        type: "GET_ID_REVIEW",
        payload: info.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getEnabledReviews() {
  return async function (dispatch) {
    try {
      const info = await axios.get(
        "/reviews/enabled"
      );
      return dispatch({
        type: GET_ENABLED_REVIEWS,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDisabledReviews() {
  return async function (dispatch) {
    try {
      const info = await axios.get(
        "/reviews/disabled"
      );
      return dispatch({
        type: GET_DISABLED_REVIEWS,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function reportAllowReview(id) {
  return async function (dispatch) {
    try {
      const info = await axios.put(
        `/reviews/${id}`
      );
      return dispatch({
        type: REPORT_REVIEW,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function setActualUser(username, ban, admin) {
  return {
    type: SET_ACTUAL_USER,
    payload: {
      username: username,
      ban: ban,
      admin: admin,
    },
  };
}
