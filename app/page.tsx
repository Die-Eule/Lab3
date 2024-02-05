'use client'
import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useUnit } from "effector-react";
import { Inputs, $taskList, addTask } from "../store/taskList";
import { useForm} from "react-hook-form";


export default function Home() {
  const { taskList, onPush } = useUnit({
    taskList: $taskList,
    onPush: addTask
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <Box
      sx={{
        width: "98vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "95vh",
      }}
    >
      <Grid container flexDirection={"column"} width={"40vw"} height={"95vh"} justifyContent={"space-between"} alignItems={"center"}>
        <Grid item marginTop={"30px"}>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Задача
          </Typography>
          <form
            onSubmit={handleSubmit((data) => {
              // alert(JSON.stringify(data));
              onPush({task: data.task, taskDescription: data.taskDescription, joined: (new Date()).toLocaleString()});
            })}
          >
            <label>Название задачи</label>
            <input {...register("task", { required: true })} />
            {errors.task && <p>Вы не заполнили название задачи</p>}
            <label>Описание</label>
            <input {...register("taskDescription")} />
            <input type="submit" />
          </form>
        </Grid>
        <Grid item>
          <Typography fontSize={"16px"} fontWeight={"500"} textAlign={"center"} lineHeight={"57px"} border={"1px solid #E2E8F0"} width={"338px"} height={"57px"} gutterBottom>
            Работу выполнил: Килина И.В.
          </Typography>
        </Grid>
      </Grid> 
      <Grid container minHeight={"170px"} flexWrap={"wrap"} alignItems={"flex-start"} justifyContent={"flex-start"} spacing={1}>
        {taskList.map((item, index) => (
          <Grid item width={"264px"} height={"98px"} border={"1px solid #E5E7EB"} marginTop={"66px"} marginLeft={"82px"}>
            <Typography fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"} color={"#0F172A"} gutterBottom>
              {item.task}
            </Typography>
            <Typography fontSize={"14px"} fontWeight={"400"} lineHeight={"20px"} color={"#0F172A"} gutterBottom>
              {item.taskDescription}
            </Typography>
            <Typography fontSize={"12px"} fontWeight={"400"} lineHeight={"16px"} color={"#64748B"} gutterBottom>
              {item.joined}
            </Typography>
          </Grid>
        ))}
      </Grid> 
    </Box>
  );
}
