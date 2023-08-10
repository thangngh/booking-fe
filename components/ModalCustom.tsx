'use client';
import { Button, Form, Input, InputNumber, Modal, Rate, Upload } from 'antd';
import Typography from '@mui/material/Typography';
import { PlusOutlined } from '@ant-design/icons';
import { useSearchParams } from 'next/navigation';
import { createStepRecipe } from '@/lib/recipe';

export default function ModalCustom({ open, handleClose, params }: any) {
    const [forms] = Form.useForm();

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not validate email!',
            number: '${label} is not a validate number!',
        },
    };
    const { TextArea } = Input;
    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const onCreateStepRecipe = async () => {
        const values = await forms.validateFields();
        const { stepId, description, file } = values;
        try {
            await createStepRecipe(
                {
                    recipeId: params,
                    stepId,
                    description,
                },
                file[0].originFileObj as File, //
            );
            handleClose();
        } catch (error) {
            console.log('error', error);
        }
    };
    return (
        <Modal
            open={open}
            onCancel={handleClose}
            footer={[
                <Button key="back" onClick={handleClose}>
                    Close
                </Button>,
                <Button key="submit" onClick={onCreateStepRecipe}>
                    Add
                </Button>,
            ]}
        >
            <Form
                validateMessages={validateMessages}
                name="form-name"
                form={forms}
                onFinish={onCreateStepRecipe}
            >
                <div className="flex items-start justify-around">
                    <div className="flex flex-col w-3/4">
                        <Form.Item
                            label="stepId "
                            name="stepId"
                            rules={[{ type: 'number', min: 1, required: true }]}
                        >
                            <InputNumber className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl" />
                        </Form.Item>
                        <div className="flex space-x-2 items-center py-2">
                            <Form.Item name="description" label="description">
                                <TextArea
                                    rows={4}
                                    className="bg-white  rounded-lg border-2 border-primary placeholder:text-base focus:bg-transparent"
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                name={'file'}
                                getValueFromEvent={normFile}
                                valuePropName="fileList"
                            >
                                <Upload listType="picture-card">
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>
                                            Upload
                                        </div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </div>
                    </div>
                    <button className="w-36 max-w-1/4 rounded-full bg-primary py-3 text-white font-medium">
                        Add
                    </button>
                </div>
            </Form>
        </Modal>
    );
}
