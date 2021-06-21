import { nanoid } from "nanoid"
import {
  CreateOrStartJobActionCreator,
  asyncActionTypeCreator,
  GeneralJobActionCreator,
  JobActions,
  CreateOrStartAsyncActionCreatorWithoutNameParameter,
  GeneralAsyncActionCreatorWithoutNameParameter,
} from "src/utilities/redux-async/asyncTypes"

/**
 * Sometimes you want to create a Job in some time before in advance to sending the actual Job.
 * Use this to create a Job first, and use {@link startJob} to fire the actual Job.
 *
 * If you want to immediately fire a Job upon creating it, use {@link startJob} directly instead.
 */
export const createJob: CreateOrStartJobActionCreator<JobActions.CREATE> = ({
  id = nanoid(),
  name,
  payload,
  // @ts-ignore
}) => ({
  id,
  name,
  payload,
  type: asyncActionTypeCreator(JobActions.CREATE, name),
})

/**
 * if you just want to start Job right away without {@link createJob},
 * use this. Perhaps this is the most common action to use it you don't create a Job in advance.
 *
 * @warning if a new id is supplied and the Job information has been already initiated with {@link createJob},
 * it will ignore the new id and proceed with the existing id.
 */
export const startJob: CreateOrStartJobActionCreator<JobActions.START> = ({
  id = nanoid(),
  name,
  payload,
  // @ts-ignore
}) => ({
  id,
  name,
  payload,
  type: asyncActionTypeCreator(JobActions.START, name),
})

/**
 * @description call this action when Job is successful
 */
export const succeedJob: GeneralJobActionCreator<JobActions.SUCCEED> = (
  params
  // @ts-ignore
) => ({
  ...params,
  type: asyncActionTypeCreator(JobActions.SUCCEED, params.name),
})

/**
 * @param params.payload insert error object in payload
 */
// @ts-ignore
export const failJob: GeneralJobActionCreator<JobActions.FAIL> = (params) => ({
  ...params,
  type: asyncActionTypeCreator(JobActions.FAIL, params.name),
})

export const cancelJob: GeneralJobActionCreator<JobActions.CANCEL> = (
  params
  // @ts-ignore
) => ({
  ...params,
  type: asyncActionTypeCreator(JobActions.CANCEL, params.name),
})

export const removeJob: GeneralJobActionCreator<JobActions.REMOVE> = (
  params
  // @ts-ignore
) => ({
  ...params,
  type: asyncActionTypeCreator(JobActions.REMOVE, params.name),
})

/**
 *
 * @param jobName The job name. For example, `LOGIN`.
 * @returns set of all async job action creators: `create`, `start`, `succeed`, `fail`, `cancel`, `remove`.
 *
 * @example
 * ```ts
 * enum JobNames {
 *  FLIGHT_TICKET_REQUEST = `FLIGHT_TICKET_REQUEST`
 * }
 *
 * const flightTicketRequestJobSet = createJobSet<
 *  JobNames.FLIGHT_TICKET_REQUEST,
 *  never,
 *  {
 *    departureFromHomeDate: Date;
 *    departureFromDestinationDate: Date;
 *    home: string;
 *    destination: string;
 *  },
 *  {
 *    availableTickets: {
 *      airline: string;
 *      price: number;
 *    }[]
 *  },
 *  AxiosError,
 *  never,
 *  never,
 * >(JobNames.FLIGHT_TICKET_REQUEST)
 *
 * const SeeTicketButton = () => {
 *  const dispatch = useDispatch();
 *
 *  return <Button
 *    onClick={() => dispatch(flightTicketRequestJobSet.start({
 *      departureFromHomeDate: new Date(`2021/03/03`),
 *      departureFromDestinationDate: new Date(`2021/03/08`),
 *      home: `Seoul`,
 *      destination: `New York`,
 *    }))}
 *  >
 *    See tickets
 *  </Button>
 * }
 *
 * // then in redux saga
 * import { getType } from 'typesafe-actions'
 *
 * yield takeLatest(getType(flightTicketRequestJobSet.start), function *(action: ActionType<typeof flightTicketRequestJobSet.start>){
 *   const result = yield call(() => window.fetch('flighttickets.com`));
 *   ...
 * })
 * ```
 */
export function createJobSet<
  JobName extends string,
  CreatePayload = undefined,
  StartPayload = undefined,
  SucceedPayload = undefined,
  FailPayload = undefined,
  CancelPayload = undefined,
  RemovePayload = undefined
>(
  jobName: JobName
): {
  create: CreateOrStartAsyncActionCreatorWithoutNameParameter<
    JobActions.CREATE,
    JobName,
    CreatePayload
  >
  start: CreateOrStartAsyncActionCreatorWithoutNameParameter<
    JobActions.START,
    JobName,
    StartPayload
  >
  succeed: GeneralAsyncActionCreatorWithoutNameParameter<
    JobActions.SUCCEED,
    JobName,
    SucceedPayload
  >
  fail: GeneralAsyncActionCreatorWithoutNameParameter<
    JobActions.FAIL,
    JobName,
    FailPayload
  >
  cancel: GeneralAsyncActionCreatorWithoutNameParameter<
    JobActions.CANCEL,
    JobName,
    CancelPayload
  >
  remove: GeneralAsyncActionCreatorWithoutNameParameter<
    JobActions.REMOVE,
    JobName,
    RemovePayload
  >
} {
  /**
   * it cannot be `[createJob, startJob, ...].map(() => ...)` because
   * TS cannot infer types correctly
   */
  return {
    create: (paramsExceptName) =>
      createJob({
        ...paramsExceptName,
        name: jobName,
      }),
    start: (paramsExceptName) =>
      startJob({
        ...paramsExceptName,
        name: jobName,
      }),
    succeed: (paramsExceptName) =>
      succeedJob({
        ...paramsExceptName,
        name: jobName,
      }),
    fail: (paramsExceptName) =>
      failJob({
        ...paramsExceptName,
        name: jobName,
      }),
    cancel: (paramsExceptName) =>
      cancelJob({
        ...paramsExceptName,
        name: jobName,
      }),
    remove: (paramsExceptName) =>
      removeJob({
        ...paramsExceptName,
        name: jobName,
      }),
  }
}
