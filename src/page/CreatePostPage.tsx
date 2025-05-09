import { useForm, SubmitHandler } from 'react-hook-form'; // Controller는 기본 HTML 요소만 사용하므로 여기서는 제거
import { PostPayload } from '@/types/post';
import { cn } from '@/lib/utils';
import SimpleInput from '@/components/SimpleInput';
import ProgressButton from '@/components/ProgressButton';
import useCreatePostMutation from '@/hooks/useCreatePostMutation';
import { useNavigate } from 'react-router';
import PrevButton from '@/components/PrevButton';
import { useToastStore } from '@/store/useToastStore';
import { CATEGORY_CODES, CATEGORY_TYPES, LOCATIONS } from '@/constants/post';
import ToggleButton from '@/components/ToggleButton';

const CreatePostPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
    reset,
    setValue,
  } = useForm<PostPayload>({
    defaultValues: {
      title: '',
      description: '',
      location: '',
      maxAmount: 0,
      donationDate: '',
      category: '',
      capacity: 0,
      isDonationOpen: false,
    },
  });

  const navigate = useNavigate();
  const { addToast } = useToastStore();
  const { mutate: createPost, isPending } = useCreatePostMutation();

  const formValues = watch();
  const needSteps = [
    formValues.title.trim() !== '',
    formValues.description.trim() !== '',
    formValues.location.trim() !== '',
    formValues.category.trim() !== '',
    formValues.maxAmount > 0,
    formValues.donationDate.trim() !== '',
    formValues.capacity > 0,
  ];
  const completedSteps = needSteps.filter(Boolean).length;
  const totalSteps = needSteps.length;

  const currentSupportAmount = watch('maxAmount');

  const onSubmit: SubmitHandler<PostPayload> = (data) => {
    createPost(data, {
      onSuccess: () => {
        addToast({
          message: '게시물이 성공적으로 생성되었습니다.',
          variant: 'default',
        });
        reset();
        navigate('/');
      },
    });
  };

  const getTodayString = () => {
    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = (todayDate.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = todayDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const progressPercentage =
    totalSteps > 0 ? Math.floor((completedSteps / totalSteps) * 100) : 0;
  console.log(errors, isValid, isDirty);
  console.log(completedSteps, totalSteps, progressPercentage);
  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg sm:p-8">
      <div className="relative mb-5">
        <PrevButton className="absolute top-0 left-0" />
        <h2 className="text-center text-2xl font-bold text-gray-800 sm:mb-8 sm:text-3xl">
          새 게시물 작성
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <SimpleInput
          label="제목"
          id="title"
          type="text"
          placeholder="제목을 입력해주세요."
          register={register}
          errors={errors}
          {...register('title', {
            required: '제목을 입력해주세요.',
          })}
        />

        <div>
          <textarea
            id="description"
            rows={4}
            placeholder="설명을 입력해주세요."
            className={cn(
              'w-full border-none focus:ring-0 focus:outline-none',
              errors.description ? 'border-red-500' : 'border-gray-300',
            )}
            {...register('description', {
              required: '설명을 입력해주세요.',
            })}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label htmlFor="category" className="text-sm text-gray-500">
            카테고리
          </label>
          <label htmlFor="location" className="text-sm text-gray-500">
            장소
          </label>
          <select
            id="category"
            className={cn(
              `w-28 rounded-lg border bg-gray-50 px-3 py-1.5 text-sm text-gray-900 transition-colors duration-150 ease-in-out focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none`,
              errors.category ? 'border-red-500' : 'border-gray-300',
            )}
            {...register('category', {
              required: '카테고리를 선택해주세요',
            })}
            defaultValue=""
          >
            <option value="" disabled>
              선택
            </option>
            {CATEGORY_TYPES.map((category) => (
              <option
                key={category}
                value={CATEGORY_CODES[category as keyof typeof CATEGORY_CODES]}
              >
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-center text-xs text-red-500">
              {errors.category.message}
            </p>
          )}
          <select
            id="location"
            className={cn(
              `w-28 rounded-lg border bg-gray-50 px-3 py-1.5 text-sm text-gray-900 transition-colors duration-150 ease-in-out focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none`,
              errors.category ? 'border-red-500' : 'border-gray-300',
            )}
            {...register('location', {
              required: '장소를 선택해주세요',
            })}
            defaultValue=""
          >
            <option value="" disabled>
              선택
            </option>
            {LOCATIONS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-center text-xs text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <SimpleInput
            label="시작 날짜"
            id="donationDate"
            type="date"
            placeholder="시작 날짜를 선택해주세요."
            register={register}
            min={getTodayString()}
            errors={errors}
            {...register('donationDate', {
              required: '시작 날짜를 선택해주세요.',
              validate: (value) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const selectedDate = new Date(value);

                const [year, month, day] = value.split('-').map(Number);
                selectedDate.setFullYear(year, month - 1, day);
                selectedDate.setHours(0, 0, 0, 0);

                return (
                  selectedDate >= today || '시작 날짜는 오늘 이후여야 합니다.'
                );
              },
            })}
          />
          {errors.donationDate && (
            <p className="mt-1 text-xs text-red-600">
              {errors.donationDate.message}
            </p>
          )}
          <SimpleInput
            label="참가 인원 제한"
            id="capacity"
            type="number"
            placeholder="참가 인원 제한을 입력해주세요."
            register={register}
            errors={errors}
            className={`w-full border px-3 py-2 ${errors.capacity ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
            {...register('capacity', {
              required: '참가 인원 제한을 입력해주세요.',
              valueAsNumber: true,
              min: {
                value: 1,
                message: '참가 인원은 최소 1명 이상이어야 합니다.',
              },
            })}
          />
        </div>
        <div className="flex items-center gap-2">
          <p>{formValues.isDonationOpen ? '후원 켜짐' : '후원 꺼짐'}</p>
          <ToggleButton
            {...register('isDonationOpen')}
            onChange={(e) => {
              setValue('isDonationOpen', e.target.checked);
            }}
          />
        </div>
        {formValues.isDonationOpen && (
          <SimpleInput
            label="후원 금액"
            id="maxAmount"
            type="number"
            placeholder="후원 금액을 입력해주세요."
            register={register}
            errors={errors}
            {...register('maxAmount', {
              required: '후원 금액을 입력해주세요.',
              valueAsNumber: true,
              min: {
                value: 0,
                message: '후원 금액은 0원 이상이어야 합니다.',
              },
            })}
          />
        )}
        <ProgressButton
          progressPercentage={progressPercentage}
          isFormValid={isValid && isDirty}
        />
      </form>
    </div>
  );
};

export default CreatePostPage;
