import React from "react";
import styled from "styled-components";
import push from "react-push-notification";

interface data {
  todo: string;
  id: number;
  staus: boolean;
  Describe: string;
  start: string;
  end: string;
  time: string;
}

const Hero = () => {
  const [todovalue, setTodo] = React.useState("");
  const [data, setData] = React.useState<data[]>([]);

  //   created id
  let idData: number = data.length + 1;

  //   creating task
  const addNewTask = () => {
    // sorting algoritm
    const sortinfo = (x: any) => {
      return (a: any, b: any) => {
        if (a[x] < b[x]) {
          return a[x];
        } else if (a[x] > b[x]) {
          return -1;
        }

        return 0;
      };
    };

    // time
    const now = new Date();

    setDate(now.toDateString());
    let hr = now.getHours().toString();
    let min = now.getMinutes().toString();
    let sec = now.getSeconds().toString();
    // let aporpm = now.toString();
    var aMorPm = hr >= "12" ? "pm" : "am";

    // get all data
    setData((prev) =>
      [
        ...prev,
        {
          staus: false,
          todo: todovalue,
          id: data.length + 1,
          Describe: des,
          start: start,
          end: end,
          time: `${hr}:${min}:${sec}:${aMorPm}`,
        },
      ].sort(sortinfo("id"))
    );
  };

  // start and end
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");

  // date
  const [date, setDate] = React.useState<any>();

  //   delete task;
  const deleteTask = (id: number) => {
    let deleteData = data.filter((e) => e.id !== id);
    setData(deleteData);
  };

  // desctiption
  const [des, setdes] = React.useState("");

  //   edit
  const [edit, setedit] = React.useState(0);
  // boolean operator
  const [falses, setfalses] = React.useState(false);
  // switch edit and update button
  const chageButton = () => {
    setfalses(true);
  };

  // capture edit input
  const [input, setinput] = React.useState("");

  const updateButton = () => {
    setfalses(!true);
    data[0].todo = input;
  };

  const editdata = (id: number) => {
    setedit(id);
  };

  // done
  const [id, setId] = React.useState(0);
  const noitfy = () => {
    push({
      title: "task completed",
      duration: 10000,
      vibrate: 1,
      message: "good one",
      subtitle: "do more task",
      icon: "✔",
      native: true,
    });
  };
  const changeDoneState = (id: number) => {
    data[0].staus = true;
    setId(id);
    noitfy();
  };

  function requestNotificationPermission() {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        }
      });
    }
  } // allow notification access

  return (
    <Container>
      <h2 onClick={noitfy}>welcome 😎</h2>
      <span>let create a task for today</span>

      {/* start and finish */}
      <StartAndFinish>
        <Hold>
          <Start>set start</Start>
          <SeleteDate
            onChange={(e) => {
              setStart(e.target.value);
            }}
            type={"date"}
          />
        </Hold>
        <Hold>
          <End>set end</End>
          <SeleteDate
            onChange={(e) => {
              setEnd(e.target.value);
            }}
            type={"date"}
          />
        </Hold>
      </StartAndFinish>

      {/* title */}
      <Input
        placeholder="Enter your task"
        maxLength={15}
        onChange={(e: any) => {
          setTodo(e.target.value);
        }}
      />

      {/* desctiption */}
      {todovalue !== "" ? (
        <Textarea
          maxLength={15}
          onChange={(e) => {
            setdes(e.target.value);
          }}
          placeholder="short description"
        />
      ) : null}

      {todovalue !== "" ? (
        <Submit cusor="value" onClick={addNewTask} bg="black">
          Submit
        </Submit>
      ) : (
        <Submit cusor="" bg="silver">
          Submit
        </Submit>
      )}
      <br />
      <br />
      <br />
      <br />
      <h3>all task</h3>
      <SlidDown>
        {data.map((data) => (
          <Card>
            <Title>
              <i>Title :</i> {data.todo}
            </Title>

            <Dis>
              <i>Description:</i> {data.Describe}
            </Dis>
            <Time>This Task Was Created on {date}</Time>
            <Time>By {data.time}</Time>
            <Start>
              <i>Start :</i> {data.start}
            </Start>
            <End>
              {" "}
              <i>End :</i> {data.end}
            </End>
            {/* edit */}
            {data.id === edit && falses ? (
              <input
                onChange={(e) => {
                  setinput(e.target.value);
                }}
                onClick={() => {
                  editdata(data.id);
                }}
                defaultValue={data.todo}
              />
            ) : null}
            <Wrap>
              {data.id === edit && falses ? (
                <Button
                  onClick={() => {
                    updateButton();
                    editdata(data.id);
                  }}
                  bg="value"
                >
                  Update
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    chageButton();
                    editdata(data.id);
                  }}
                  bg=""
                >
                  edit
                </Button>
              )}
              <Button
                onClick={(id) => {
                  changeDoneState(data.id);
                }}
                bg=""
              >
                done
              </Button>
              {/* <DoneWrapper>
                <DoneInput type={"radio"} value="gender" name="gender" /> done
                <Undone type={"radio"} value="gender" name="gender" /> undone
              </DoneWrapper> */}
              <Button
                bg=""
                onClick={() => {
                  deleteTask(data.id);
                }}
              >
                delete
              </Button>
            </Wrap>

            <Done dn={""}>
              <pre>
                This task as <br /> been done
              </pre>
              <br />
              {"👇"} <p>{data.todo}</p>
              {"✔"}
            </Done>
          </Card>
        ))}
      </SlidDown>
      <nav>
        ©2022
        <a href="https://wa.me/2348183389407">sannidamilolafortune,</a>
        Inc. All rights reserved. Terms of use Privacy Policy
      </nav>
    </Container>
  );
};

export default Hero;

const DoneInput = styled.input``;
const Undone = styled.input``;
const DoneWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SlidDown = styled.div`
  @media screen and (max-width: 500px) {
    overflow-y: scroll;
    height: 400px;
  }
`;

const Hold = styled.div``;

const Start = styled.pre`
  font-size: 18px;
  margin: 0;
  font-weight: 500;
  text-transform: capitalize;
  width: 80%;
  @media screen and (max-width: 500px) {
    font-size: 15px;
    width: 60%;
  }
`;
const End = styled.pre`
  margin: 0;
  font-size: 18px;
  width: 86%;
  font-weight: 500;
  @media screen and (max-width: 500px) {
    font-size: 15px;
    width: 65%;
  }
  text-transform: capitalize;
`;
const Span = styled.span``;

const StartAndFinish = styled.div`
  flex-direction: column;
  display: flex;
`;

const SeleteDate = styled.input`
  margin-bottom: 20px;
  width: 200px;
  height: 50px;
  padding-left: 10px;
  font-size: 20px;
  @media screen and (max-width: 500px) {
    font-size: 15px;
    padding-left: 10px;
  }
`;

const Textarea = styled.textarea`
  margin-top: 20px;
  width: 300px;
  height: 50px;
  resize: none;
  border: 0;
  padding-left: 10px;
  padding-top: 10px;
  outline: none;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  @media screen and (max-width: 500px) {
    width: 200px;
  }
`;

const Dis = styled.div`
  width: 250px;
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 10px;
  @media screen and (max-width: 500px) {
    font-size: 15px;
    width: 60%;
  }
`;

const Card = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding-bottom: 20px;
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  @media screen and (max-width: 500px) {
    font-size: 15px;
    padding: 0;
    width: 300px;
    padding-bottom: 20px;
    padding-top: 20px;
    flex-wrap: wrap;
  }
  i {
    color: green;
    font-weight: bold;
    font-size: 20px;
    @media screen and (max-width: 500px) {
      font-size: 15px;
    }
  }
  input {
    @media screen and (max-width: 500px) {
      width: 60%;
    }
    width: 76%;
    height: 30px;
    margin-top: 20px;
    padding-left: 10px;
  }
  position: relative;
`;
const Done = styled.div<{ dn: string | null }>`
  backdrop-filter: blur(6px);
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-wrap: wrap;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  display: ${({ dn }) => (dn ? "flex" : "none")};
  pre {
    margin-right: 8px;
    margin: 0;
  }
  p {
    color: green;
    width: 300px;
    margin: 0;
  }
`;
const Title = styled.div`
  width: 250px;
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 10px;
  @media screen and (max-width: 500px) {
    font-size: 15px;
    width: 60%;
  }
`;
const Time = styled.div`
  font-weight: 500;
  width: 80%;
  font-size: 18px;
  margin-bottom: 10px;
  @media screen and (max-width: 500px) {
    font-size: 15px;
    width: 60%;
  }
`;
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button<{ bg: string }>`
  background-color: ${({ bg }) => (bg ? "red" : "")};
  margin-right: 10px;
  padding: 8px 30px;
  margin-top: 20px;
  text-transform: capitalize;
  font-weight: 500;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    font-size: 14px;
    padding: 8px 10px;
  }
`;

const Submit = styled.button<{ bg: string; cusor: string }>`
  padding: 17px 170px;
  margin-top: 20px;
  border-radius: 30px;
  cursor: ${({ cusor }) => (cusor ? "pointer" : "not-allowed")};
  border: 0;
  font-weight: 500;
  color: white;
  font-size: 19px;
  background-color: ${(bg) => bg.bg};
  transition: 360ms;
  @media screen and (max-width: 500px) {
    padding: 17px 90px;
  }
  :hover {
    transform: scale(0.9);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  nav {
    width: 300px;
    text-align: center;
    font-size: 11px;
    text-transform: lowercase;
    a {
      margin-right: 4px;
      margin-left: 4px;
    }
    @media screen and (max-width: 500px) {
      width: 250px;
    }
  }
  h2 {
    font-size: 20px;
    text-transform: capitalize;
    @media screen and (max-width: 500px) {
      font-size: 17px;
    }
  }
  h3 {
    text-transform: capitalize;
    @media screen and (max-width: 500px) {
      font-size: 17px;
    }
  }
  span {
    font-weight: 500;
    font-size: 17px;
    margin-bottom: 20px;
    text-transform: capitalize;
  }
`;

const Input = styled.input`
  border: none;
  outline: 0;
  width: 380px;
  height: 55px;
  border-radius: 6px;
  padding-left: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  @media screen and (max-width: 500px) {
    width: 200px;
  }
  ::placeholder {
    font-size: 18px;
    font-weight: 500;
  }
`;
